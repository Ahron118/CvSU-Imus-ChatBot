// script.js

let messages = [];
let undoStack = [];
let redoStack = [];
let buttonStates = [];

// Function to send a message (user input)
function sendMessage(text) {
    const messageContainer = document.getElementById('chat-messages');
    
    // Add user's message to the chat interface
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user');
    userMessageElement.textContent = text;
    messageContainer.appendChild(userMessageElement);
    
    // Store user's message in the messages array and undo stack
    messages.push({ type: 'user', text });
    undoStack.push({ type: 'user', text });
    redoStack = [];

    saveButtonState();
    updateButtons(text);
    
  // Simulate bot's response after a delay
  setTimeout(() => {
    const botResponse = getBotResponse(text);
    const botMessageElement = document.createElement('div');
 botMessageElement.classList.add('message', 'bot');
    botMessageElement.innerHTML = botResponse;
    messageContainer.appendChild(botMessageElement);

    messages.push({ type: 'bot', text: botResponse });
    undoStack.push({ type: 'bot', text: botResponse });

// Play the notification sound when the bot responds
    playNotificationSound();

    messageContainer.scrollTop = messageContainer.scrollHeight;
}, 1000);

}

// Function to play the notification sound
function playNotificationSound() {
const notificationSound = document.getElementById('notification-sound');
notificationSound.play();
}



function updateButtons(text) {
    const messageInput = document.getElementById('message-input');
    messageInput.innerHTML = ''; // Clear the current buttons
    
    const newButtons = document.createElement('div');
    newButtons.id = 'dynamic-buttons';
    
    // Edit the clickable messages and their responses here
    switch(text.toLowerCase()) {
        case 'hello':
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('About Admission')">About Admission</button>
                <button class="btn" onclick="sendMessage('Academic Programs')">Academic Programs</button>
                <button class="btn" onclick="sendMessage('About Enrollment')">About Enrollment</button>
                <button class="btn" onclick="sendMessage('About Adding, Dropping and Changing of Subjects/ Schedules')">About Adding, Dropping and Changing of Subjects/ Schedules</button>
                <button class="btn" onclick="sendMessage('University')">About University</button>
                <button class="btn" onclick="sendMessage('Student Organizations')">Student Organizations</button>
                <button class="btn" onclick="sendMessage('Contacts')">Campus Contacts</button>
                <button class="btn" onclick="sendMessage('Goodbye')">Goodbye</button>
            `;
            break;
        case 'about admission':
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('Admission Requirements')">Admission Requirements</button>
                <button class="btn" onclick="sendMessage('Admission Procedures')">Admission Procedures</button>
                <button class="btn" onclick="sendMessage('Strand Alignments')">Strand Alignments</button>
                <button class="btn" onclick="sendMessage('Goodbye')">Goodbye</button>
            `;
            break;
        case 'admission procedures':
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('1st Year Applicant')">1st Year Applicant</button>
                <button class="btn" onclick="sendMessage('Transferee')">Transferee</button>
                <button class="btn" onclick="sendMessage('Second Courser')">Second Courser</button>
                <button class="btn" onclick="sendMessage('Teacher Certificate Program')">Teacher Certificate Program (TCP)</button>
                <button class="btn" onclick="sendMessage('Goodbye')">Goodbye</button>
            `;
            break;
        case 'about adding, dropping and changing of subjects/ schedules':
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('Adding of Subjects')">Adding of Subjects</button>
                <button class="btn" onclick="sendMessage('Dropping of Subjects')">Dropping of Subject</button>
                <button class="btn" onclick="sendMessage('Changing of Subjects')">Changing of Subjects</button>
                <button class="btn" onclick="sendMessage('Changing of Schedules')">Changing of Schedules</button>
            `;
            break;
        case '1st year applicant':
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('Reminders')">Reminders</button>
                <button class="btn" onclick="sendMessage('Requirements & Procedure For First-year')">Requirements & Procedure for First-year</button>
                <button class="btn" onclick="sendMessage('Goodbye')">Goodbye</button>
            `;
            break;
        case 'transferee':
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('Reminders')">Reminders</button>
                <button class="btn" onclick="sendMessage('Requirements & Procedure For Transferee')">Requirements & Procedure For Transferee</button>
                <button class="btn" onclick="sendMessage('Goodbye')">Goodbye</button>
                `;
            break;
        case 'second courser':
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('Reminders')">Reminders</button>
                <button class="btn" onclick="sendMessage('Requirements & Procedure For Second Courser')">Requirements & Procedure For Second Courser</button>
                <button class="btn" onclick="sendMessage('Goodbye')">Goodbye</button>
                `;
            break;
        case 'teacher certificate program':
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('Reminders')">Reminders</button>
                <button class="btn" onclick="sendMessage('Requirements & Procedure For TCP')">Requirements & Procedure For TCP</button>
                <button class="btn" onclick="sendMessage('Goodbye')">Goodbye</button>
                `;
            break;
        case 'transfer subject':
        case 'drop subject':
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('Goodbye')">Goodbye</button>
            `;
            break;
        case 'university':
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('History')">History</button>
                <button class="btn" onclick="sendMessage('Campus History')">Campus History</button>
                <button class="btn" onclick="sendMessage('Vision, Mission, & Objectives')">Vision, Mission, & Objective</button>
                <button class="btn" onclick="sendMessage('Seal')">Seal</button>
                <button class="btn" onclick="sendMessage('Hymn')">Hymn</button>
                <button class="btn" onclick="sendMessage('Goodbye')">Goodbye</button>
            `;
            break;
        case 'goodbye':
            newButtons.innerHTML = `
                <div class="end-message">Chat ended. Have a great day!</div>
            `;
            break;
        default:
            newButtons.innerHTML = `
                <button class="btn" onclick="sendMessage('Hello')">Hello</button>
                <button class="btn" onclick="sendMessage('Goodbye')">Goodbye</button>
            `;
            break;
    }
    
    // Append the new buttons to the message input container
    messageInput.appendChild(newButtons);
}

// Function to get bot's response based on user's input
function getBotResponse(userText) {
    // Edit the responses of the chatbot here
    switch(userText.toLowerCase()) {
        case 'hello':
            return 'Hi there! How can I assist you today?';
        case 'about admission':
            return 'For admission, please select on below for the information you want to know.';
        case 'admission requirements':
            return `For more information about admission requirements & procedures, please visit <a href="https://cvsu-imus.edu.ph/admission/" target="_blank">admission requirements page on official website</a>.
            <br>
            <style>
            p {
                text-align: justify;
            }
            </style>
            <p><b>Freshmen</b></p>
            <p><b>✔</b>Graduate/graduating Senior High School student or ALS Passer</p>
            <p><b>✔</b>Have no enrollment record for a degree program in any University/College</p>
            <p><b>Transferee</b></p>
            <p><b>✔</b>Have an enrollment record for a program in other University/College</p>
            <p><b>✔</b>Have GPA of 2.00 or better and without failing grade</p>
            <p><b>✔</b>Have not exceeded second year standing</p>
            <p><b>Second Courser</b></p>
            <p><b>✔</b>Have finished a bachelor degree program</p>
            <p><b>✔</b>Will enroll for another bachelor degree program</p>
            <p><b>Returnee</b></p>
            <p><b>✔</b>Have an existing enrollment record in Imus Campus</p>
            <p><b>✔</b>Have no enrollment record in other University/College prior the application</p>
            <p><b>✔</b>Not enrolled in the current or previous semester</p>
            <p><b>Teacher Certificate Program (TCP) Student</b></p>
            <p><b>✔</b>Have finished a bachelor degree program</p>
            <p><b>✔</b>Will enroll for Techer Certificate Program (TCP)</p>
            <p><b>Graduate School Student</b></p>
            <p><b>✔</b>Have finished a bachelor degree program</p>
            <p><b>✔</b>Will enroll for a masters degree</p>
            `;
        case 'admission procedures':
            return 'What type of Applicant are you first before we proceed?';
        case '1st year applicant':
            return `
            <p> if you're considering applying as a first-year student, please take note of the following categories: </p>
            <br>
            <p> A. Grade 12 student who is currently enrolled and is expecting to finish SHS at the end of the school year.
            <br>
            B. SHS Graduate who have never been enrolled in any college/university
            <br>
            C. ALS Completer
            <br>
            D. Associate, Certificate, Vocational, or Diploma Degree Holder – one who has finished a certificate, vocational, diploma course or associate degree in any college/university </p>
            `;
        case 'transferee':
            return `
            <p> If you are considering transferring to our campus, please take note of the following </p>
            <p> Applicants who started their college level from other university/school or other CvSU campus </p>
            `;
        case 'second courser':
            return `
            One who has already completed and graduated with any Bachelor’s degree program
            `;
        case 'teacher certificate program':
            return `
            Applicants who graduated any Bachelor’s degree program, interested to pursue 18-units of Education    
            `;   
        case 'reminders':
            return `
            <h3> Reminders </h3>
            <p>The following are strictly prohibited and will mean non-evaluation of your application:</p>
            <ul>
                <li>Creation and use of different email address to access the online application form.</li> 
                <li>Multiple applications in the admission system. This can be traced by the evaluator.</li> 
                <li>Any deception, falsification, and dishonesty in the declaration of information.</li> 
                <li>Submission of incomplete requirements.</li> 
                <li>Not following the instructions posted in the announcement.</li>
            </ul>   
            <br>
            <p>To go back please click the <strong>Undo</strong> button and proceed to Requirements & Procedure. </p>
            `;
        case 'requirements & procedure for first-year':
            return `
            <p> Here are the <strong>requirements and procedure</strong> for a <strong>first-year applicant.</strong> </p>
            <ol>
                <li>Applicants shall fill out the application form through this link. Select <strong> 1st semester 2024-2025 </strong> and <strong> CvSU Imus </strong> as branch.
                <a href="https://apps.cvsu.edu.ph/" target="_blank">Admission Portal</a></p></li>

                <li>Review encoded information then <strong> generate control number. </strong></li>

                <li>Applicants will select from the admission system the preferred date and time of <strong> on-site submission of requirements. </strong> </li>

                <li>Download and print the application form. Applicants should affix their signature and attach 1×1 ID picture in the form. </li>

                <li>On the appointment date, applicant will submit the application together with the <strong> complete </strong> required documents at the Campus Office of Student Affairs and Services (OSAS).
                    Only scheduled applicants on the particular date will be accommodated. </li>
                <li> Requirements (Photocopy and Original): 
                <br>
                <strong>First Year Applicants (Currently Grade 12 Students)</strong>
                    <ul>
                        <li>Accomplished Application Form for Admission</li>
                        <li>Grade 11 card</li>
                        <li>Certificate from the Principal or Adviser indicating that the applicant is currently enrolled as a Grade 12 student and the strand is also indicated.</li>
                        <p style="text-alig: center;"><i>MUST be original signature not e-signature</p>
                        <li>Ordinary short white folder <i>(Indicate last name, first name and control number)</i></li>
                    </ul>
                <br>
                <strong>First Year Applicants (SHS Graduate) </strong>
                    <ul>
                        <li>Accomplished Application Form for Admission</li>
                        <li>Completed Grade 12 card</li>
                        <li>Certificate of non-issuance of Form 137 for College Admission</li>
                        <li>Ordinary short white folder <i>(Indicate last name, first name and control number)<i></li>
                    </ul>
                <strong>First Year Applicants (ALS Completer/Passer) </strong>
                    <ul>
                        <li>Accomplished Application Form for Admission</li>
                        <li>Certificate of Rating (COR) w/ eligibility to ernroll in college</li>
                        <li>Ordinary short white folder <i>(indicate last name, first name, and control number)</i></li>
                    </ul>
                <strong>First Year Applicants (Associate/Certificate/Vocational, or Diploma Holder</strong>
                    <ul>
                        <li>Accomplished Application Form for Admission</li>
                        <li>Transcript Records (TOR) with graduate date</li>
                        <li>Ordinary short white folder <i>(indicate last name, first name, and control number)</i></li>
                    </ul>
                </li>
                <li>Validated applicants will be scheduled for admission examination.</li>
                <li>Admission Examination.
                <br>
                <strong>Reminders for Admission Examination:</strong>
                    <ul>
                        <li>Bring Pencil No. 1</li>
                        <li>Attach 1 x 1 ID picture in the exam permit</li>
                        <li>Bring ID Card, alcohol/sanitizer</li>
                        <li>Keep your exam permit safe and secure.</li>
                        <li>No permit, No exam</li>
                        <li>Don’t be late.</li>
                        <li>Only scheduled applicants for a particular schedule will be allowed to enter the Campus.</li>
                        <li>Face mask must be worn properly at all times</li>
                        <li>No drinks and food are allowed during examination</li>
                    </ul>
                </li>
                <li>Wait for an announcement regarding the Admission Result.</li>
            </ol>
            <br>
            <p>See original post <a href="https://www.facebook.com/OSASCvSUImus/posts/pfbid0RsB7CVjsCVS6eCXvaQa4bj2A9EhiezzoS5XsJNa42SbevTxgj5EQh68kGx1di647l" target="_blank">here</a> for more details.</p>
            `;    
        case 'requirements & procedure for transferee':
            return `
            <p> Here are the <strong>requirements and procedure</strong> for a <strong>transferee applicant.</strong> </p>
            <ol>
                <li>Applicants shall fill out the application form through this link. Select <strong> 1st semester 2024-2025 </strong> and <strong> CvSU Imus </strong> as branch.
                <a href="https://apps.cvsu.edu.ph/" target="_blank">Admission Portal</a></p></li>

                <li>Review encoded information then <strong> generate control number. </strong></li>

                <li>Applicants will select from the admission system the preferred date and time of <strong> on-site submission of requirements. </strong> </li>

                <li>Download and print the application form. Applicants should affix their signature and attach 1×1 ID picture in the form. </li>

                <li>On the appointment date, applicant will submit the application together with the <strong> complete </strong> required documents at the Campus Office of Student Affairs and Services (OSAS).
                    Only scheduled applicants on the particular date will be accommodated. </li>
                <li> Requirements (Photocopy and Original): 
                <br>
                <strong>Transferee Applicants</strong>
                    <ul>
                        <li>Accomplished Application Form for Admission</li>
                        <li>Transcript of Records (TOR) / Certificate of Grades</li>
                        <li>Ordinary short white folder <i>(Indicate last name, first name and control number)</i></li>
                    </ul>
                <p style="text-align: center;"><i>Other required documents such as Honorable Dismissal, Certificate of Good Moral Character, NBI or Police Clearance shall be submitted AFTER the applicant passed the grade evaluation of the College/Campus concerned.</i></p>
                </li>               
                <li>Transferee applicants will only undergo evaluation and will not take the admission examination.</li>
                <li>Wait for an announcement regarding the Admission Result.</li>
            </ol>
            <br>
            <p>See original post <a href="https://www.facebook.com/OSASCvSUImus/posts/pfbid0RsB7CVjsCVS6eCXvaQa4bj2A9EhiezzoS5XsJNa42SbevTxgj5EQh68kGx1di647l" target="_blank">here</a> for more details.</p>
            `;
        case 'requirements & procedure for second courser':
            return `
            <p> Here are the <strong>requirements and procedure</strong> for a <strong>Second Courser applicant.</strong> </p>
            <ol>
                <li>Applicants shall fill out the application form through this link. Select <strong> 1st semester 2024-2025 </strong> and <strong> CvSU Imus </strong> as branch.
                <a href="https://apps.cvsu.edu.ph/" target="_blank">Admission Portal</a></p></li>

                <li>Review encoded information then <strong> generate control number. </strong></li>

                <li>Applicants will select from the admission system the preferred date and time of <strong> on-site submission of requirements. </strong> </li>

                <li>Download and print the application form. Applicants should affix their signature and attach 1×1 ID picture in the form. </li>

                <li>On the appointment date, applicant will submit the application together with the <strong> complete </strong> required documents at the Campus Office of Student Affairs and Services (OSAS).
                    Only scheduled applicants on the particular date will be accommodated. </li>
                <li> Requirements (Photocopy and Original): 
                <br>
                <strong>Second Courser Applicants</strong>
                    <ul>
                        <li>Accomplished Application Form for Admission</li>
                        <li>Transcript of Records (TOR) with graduation date</li>
                        <li>Ordinary short white folder <i>(Indicate last name, first name and control number)</i></li>
                    </ul>
                <p style="text-align: center;"><i>Other required documents like Honorable Dismissal, shall be submitted AFTER the applicant passed the grade evaluation of the College/Campus concerned.</i></p>
                </li>
                <li>Wait for an announcement regarding the Admission Result.</li>
            </ol>
            <br>
            <p>See original post <a href="https://www.facebook.com/OSASCvSUImus/posts/pfbid0RsB7CVjsCVS6eCXvaQa4bj2A9EhiezzoS5XsJNa42SbevTxgj5EQh68kGx1di647l" target="_blank">here</a> for more details.</p>
            `;
        case 'requirements & procedure for tcp':
            return `
            <p> Here are the <strong>requirements and procedure</strong> for a <strong>Teacher Certificate Program (TCP) applicant.</strong> </p>
            <ol>
                <li>Applicants shall fill out the application form through this link. Select <strong> 1st semester 2024-2025 </strong> and <strong> CvSU Imus </strong> as branch.
                <a href="https://apps.cvsu.edu.ph/" target="_blank">Admission Portal</a></p></li>

                <li>Review encoded information then <strong> generate control number. </strong></li>

                <li>Applicants will select from the admission system the preferred date and time of <strong> on-site submission of requirements. </strong> </li>

                <li>Download and print the application form. Applicants should affix their signature and attach 1×1 ID picture in the form. </li>

                <li>On the appointment date, applicant will submit the application together with the <strong> complete </strong> required documents at the Campus Office of Student Affairs and Services (OSAS).
                    Only scheduled applicants on the particular date will be accommodated. </li>
                <li> Requirements (Photocopy and Original): 
                <br>
                <strong>Teacher Certificate Program (TCP) Applicants</strong>
                    <ul>
                        <li>Accomplished Application Form for Admission</li>
                        <li>Transcript of Records (TOR) with graduation date</li>
                        <li>Ordinary short white folder <i>(Indicate last name, first name and control number)</i></li>
                    </ul>
                <p style="text-align: center;"><i>Other required documents like Honorable Dismissal, shall be submitted AFTER the applicant passed the grade evaluation of the College/Campus concerned.</i></p>
                </li>
                <li>TCP applicants will only undergo evaluation and will not take the admission examination.</li>
                <li>Wait for an announcement regarding the Admission Result.</li>
            </ol>
            <br>
            <p>See original post <a href="https://www.facebook.com/OSASCvSUImus/posts/pfbid0RsB7CVjsCVS6eCXvaQa4bj2A9EhiezzoS5XsJNa42SbevTxgj5EQh68kGx1di647l" target="_blank">here</a> for more details.</p>
            `;
        case 'strand alignments':
            return `
            <h3>Here are the list of the programs that are aligned in Senior High School Strands:</h3>
            <table><thead>
            <tr>
                <th><strong>Strand</strong>
                </th><th><strong>Program Description</strong></th>
            </tr></thead>
            <tbody>
                <tr>
                    <td>ABM</td>
                    <td>Bachelor of Science in Entrepreneurship</td>
                </tr><tr><td>ABM</td>
                    <td>Bachelor of Science in Business Administration</td>
                </tr><tr><td>ABM</td>
                    <td>Bachelor of Science in Hospitality Management</td>
                </tr><tr><td>ABM</td>
                    <td>Bachelor of Science in Office Administration</td>
                </tr><tr><td>GAS</td>
                    <td>Bachelor of Arts in Journalism</td></tr>
                <tr><td>GAS</td>
                    <td>Bachelor of Early Childhood Education</td>
                </tr><tr><td>GAS</td>
                    <td>Bachelor of Elementary Education</td></tr>
                <tr><td>GAS</td>
                    <td>Bachelor of Science in Entrepreneurship</td>
                </tr><tr>
                    <td>GAS</td><td>Bachelor of Secondary Education Major in English</td>
                </tr><tr><td>GAS</td>
                    <td>Bachelor of Secondary Education Major in Mathematics</td>
                </tr><tr><td>GAS</td>
                    <td>Bachelor of Science in Office Administration</td>
                </tr><tr><td>GAS</td>
                    <td>Bachelor of Science in Psychology</td>
                </tr><tr><td>HUMSS</td>
                    <td>Bachelor of Arts in Journalism</td>
                </tr><tr><td>HUMSS</td>
                    <td>Bachelor of Early Childhood Education</td>
                </tr><tr><td>HUMSS</td>
                    <td>Bachelor of Elementary Education</td>
                </tr><tr><td>HUMSS</td>
                    <td>Bachelor of Secondary Education Major in English</td>
                </tr><tr><td>HUMSS</td>
                    <td>Bachelor of Secondary Education Major in Mathematics</td>
                </tr><tr><td>HUMSS</td>
                    <td>Bachelor of Science in Psychology</td>
                </tr><tr><td>STEM</td>
                    <td>Bachelor of Early Childhood Education</td>
                </tr><tr><td>STEM</td>
                    <td>Bachelor of Elementary Education</td>
                </tr><tr><td>STEM</td>
                    <td>Bachelor of Science in Business Administration</td>
                </tr><tr><td>STEM</td>
                    <td>Bachelor of Science in Computer Science</td>
                </tr><tr><td>STEM</td>
                    <td>Bachelor of Secondary Education Major in English</td>
                </tr><tr><td>STEM</td>
                    <td>Bachelor of Secondary Education Major in Mathematics</td>
                </tr><tr><td>STEM</td>
                    <td>Bachelor of Science in Psychology</td>
                </tr><tr><td>TVL</td>
                    <td>Bachelor of Science in Computer Science</td>
                </tr><tr><td>TVL</td>
                    <td>Bachelor of Science in Hospitality Management</td>
                </tr><tr><td>TVL</td>
                    <td>Bachelor of Science in Information Technology</td>
                </tr>
            </tbody>
            </table>
            <br>
            <p>For more details, visit campus <a href="https://cvsu-imus.edu.ph" target="_blank">Official Website.</a></p>
            `;  
        case 'academic programs':
            return `For academic programs, here are the options:<br><br>
            
            <strong>Undergraduate Programs:</strong><br>
            <style>
            a:link{
                color: black;
            }
            a:visited {
              color: black;
            }
            a:hover {
              color: black;
            }
            a:active {
              color: black;
            } 
            </style>
           - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-arts-in-journalism" target="_blank">Bachelor Of Arts In Journalism</a><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-early-childhood-education" target="_blank">Bachelor Of Early Childhood Education</a><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-elementary-education" target="_blank">Bachelor Of Elementary Education</a><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-science-in-business-management" target="_blank">Bachelor Of Science In Business Management</a><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-science-in-computer-science" target="_blank">Bachelor Of Science In Computer Science</a><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-science-in-entrepreneurship" target="_blank">Bachelor Of Science In Entrepreneurship</a><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-science-in-hospitality-management" target="_blank">Bachelor Of Science In Hospitality Management</a><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-science-in-information-technology" target="_blank">Bachelor Of Science In Information Technology</a><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-science-in-office-administration" target="_blank">Bachelor Of Science In Office Administration</a><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-science-in-psychology" target="_blank">Bachelor Of Science In Psychology</a><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/bachelor-of-secondary-education" target="_blank">Bachelor Of Secondary Education</a><br><br>
                
            <strong>Non-Degree Program(s):</strong><br>
            - <a href="https://cvsu-imus.edu.ph/academics/academicprograms/teacher-certificate-program" target="_blank">Teacher Certificate Program</a>
            <br>
            <p><i> The listed program messages are clickable if you'd like to check one out just click any on the list</i></p>
            `;
        case 'university':
           return 'What are things you want to know about the university?';
        case 'student organizations':
           return `
           <h4>Here's the list of Student Organizations we have on campus: </p>
           <style>
                * {
                    color: black;
                }
           </style>
           <ul>
                <li><a href="https://www.facebook.com/csg.imus" target="_blank">Central Student Government</a></li>
                <li><a href="https://www.facebook.com/TheBITSOfficialPage" target="_blank">Builders of Innovative Technologist Society</a></li>
                <li><a href="https://www.facebook.com/BusinessMangementSociety/" target="_blank">Business Management Society</a></li>
                <li><a href="https://www.facebook.com/CaviteStateUniversityCommunicators" target="_blank">Cavite Communicators</a></li>
                <li><a href="https://www.facebook.com/chatscvsu.imus/" target="_blank">Circle of Hospitality and Tourism Students</a></li>
                <li><a href="https://www.facebook.com/CvSU.CYLE/" target="_blank">Cavite Young Leaders for Entrepreneurship</a></li>
                <li><a href="https://www.facebook.com/cvsucomputerscienceclique" target="_blank">Computer Science Clique</a></li>
                <li><a href="https://www.facebook.com/edgecares" target="_blank">Educator's Guild for Excellence</a></li>
                <li><a href="https://www.facebook.com/SMSCvSUImus/" target="_blank">Samahan ng mga Magaaral ng Sikolohiya</a></li>
                <li><a href="https://www.facebook.com/YOPACvSUImus/" target="_blank">Young Office Professional Advocates</a></li>
                <li><a href="https://www.facebook.com/STPAGOfficial" target="_blank">Sinag-Tala</a></li>
                <li><a href="https://www.facebook.com/theflarecvsuimus" target="_blank">The Flare</a></li>
                <li><a href="https://www.facebook.com/CvSUImusHonorSociety" target="_blank">Honor Society</a></li>
           </ul>
           <p> See the full details on the <a href="https://cvsu-imus.edu.ph/students/organizations" target="_blank">Official Website</a> of the campus.</p>
           `;
        case 'admission':
            return 'For admission, please select on below for the information you want to know.';
        case 'about enrollment':
            return `Congratulations on passing the entrance exam and submitting your medical examination results! 🎉 
                    About the enrollment is you will receive an email from our school registrar. This email will include your enrollment schedule, as well as a list of all the necessary requirements you need to bring on enrollment day. 
                    Make sure to check your inbox regularly for this important information. Have a good day! 
                    <br> 
                    Rest assured, the registrar's office is diligently processing everything. Please be patient while you wait for their email. 
                    <br> 
                    If you ever have a questions for the registrar just kindly send them a seperate email here. imus.registrar@cvsu.edu.ph`;
        case 'about adding, dropping and changing of subjects/ schedules':
            return `
            <p>Sure, I can help with that! You have a few options below: adding a subject, dropping a subject, or changing your schedule. All of these actions can be done through the student portal. Which one would you like to know more about?</p>
            <br>
            <p><strong>NOTE:</strong> Adding, dropping and changing of subject/schedule is <strong> NOT ALLOWED for REGULAR STUDENTS</strong></p>
            `;
        case 'adding of subjects':
            return `
            <p>Hi! Adding a subject means enrolling in an additional course that was not originally in your schedule. This is usually done if you realize you need the course or if there were any mistakes in your initial registration. To add a subject, fill out the form with the Schedule Code, Subject Code, and Units. Write the Instructor’s name and get their signature. Valid reasons for adding include needing the subject, incorrect advice, schedule conflicts, or missing prerequisites. Submit the form to your Registration Adviser for a signature, then to the Campus Registrar for validation, and finally to the MIS office for encoding. All signatures must be original and complete to process your form.</p>
            <br>
            <p><strong>General Note:</strong>For any changes to your subjects or schedule, fill out the form with the Schedule Code, Subject Code, and Units. Get it signed by the Instructor or a department representative. Submit it to your Registration Adviser, then to the Campus Registrar, and finally to the MIS office for encoding. All signatures must be original and complete to process your form.</p>
            `;
        case 'dropping of subjects':
            return `
            <p>Hi! Dropping a subject means withdrawing from a course you are currently enrolled in. This might be necessary if you find you don't need the course, if you were advised incorrectly, or if there's a scheduling conflict. To drop a subject, fill out the form with the Schedule Code, Subject Code, and Units. Write the Instructor’s name and get their signature. Valid reasons for dropping include the subject not being needed, incorrect advice, schedule conflicts, or missing prerequisites. Submit the form to your Registration Adviser for a signature, then to the Campus Registrar for validation, and finally to the MIS office for encoding. All signatures must be original and complete to process your form.</p>    
            <br>
            <p><strong>General Note:</strong>For any changes to your subjects or schedule, fill out the form with the Schedule Code, Subject Code, and Units. Get it signed by the Instructor or a department representative. Submit it to your Registration Adviser, then to the Campus Registrar, and finally to the MIS office for encoding. All signatures must be original and complete to process your form.</p>
            `;
        case 'changing of subjects':
            return `
            <p>Changing a subject means replacing one course with another. This is often done if you realize you need a different course or if there was an error in your original course selection. To change a subject, fill out the form with the Schedule Code, Subject Code, and Units. Get the Instructor's name and their signature. Reasons for changing include needing a different subject, incorrect advice, schedule conflicts, or missing prerequisites. Submit the form to your Registration Adviser, then to the Campus Registrar for validation, and finally to the MIS office for encoding. All signatures must be original and complete.</p>        
            <br>
            <p><strong>General Note:</strong>For any changes to your subjects or schedule, fill out the form with the Schedule Code, Subject Code, and Units. Get it signed by the Instructor or a department representative. Submit it to your Registration Adviser, then to the Campus Registrar, and finally to the MIS office for encoding. All signatures must be original and complete to process your form.</p>
            `;
        case 'changing of schedules':
            return `
            <p>Changing your schedule involves adjusting the times or days of your existing courses. This is useful if you have conflicts in your timetable that need to be resolved. To change your schedule, fill out the form with the Schedule Code, Subject Code, and Units. Get the Instructor's name and their signature. Reasons for changing include not needing the subject, incorrect advice, schedule conflicts, or missing prerequisites. Submit the form to your Registration Adviser, then to the Campus Registrar for validation, and finally to the MIS office for encoding. All signatures must be original and complete.</p>            
            <br>
            <p><strong>General Note:</strong>For any changes to your subjects or schedule, fill out the form with the Schedule Code, Subject Code, and Units. Get it signed by the Instructor or a department representative. Submit it to your Registration Adviser, then to the Campus Registrar, and finally to the MIS office for encoding. All signatures must be original and complete to process your form.</p>
            `;
        case 'history':
            return `
            <style>
                p {
                text-align: justify;
                } 
            </style>
            <p>The Cavite State University (CvSU) traces its origins to 1906 as the Indang Intermediate School, established by American Thomasites. It underwent several name changes before becoming Don Severino Agricultural College (DSAC) in 1964. By 1998, under Republic Act No. 8468, DSAC evolved into CvSU. Integration of Cavite College of Fisheries and Cavite College of Arts and Trade followed in 2001, expanding CvSU to 11 campuses across the province. CvSU offers nearly 100 undergraduate and graduate programs, serving over 25,000 students and employing 1,200 faculty and staff. It is recognized for its role in research and development, including as the National Center for Research and Development for Coffee and Urban Agriculture.</p>
            
            <p style="text-align: center;">See the full story here on <a href="https://cvsu-imus.edu.ph/about/universityhistory" target="_blank">the official website.</a></p>
            `;
        case 'vision, mission, & objectives':
            return `
            <style>
                * {
                text-align: justify;
                } 
            </style>
            <p><strong>Vision</strong></p>
            <p>The Premier University in historic Cavite globally recognized for excellence in character development, academics, research, innovation and sustainable community engagement.</p>
            <p><strong>Mithiin ng Pamantasan</strong></p>
            <p>Ang nangungunang pamantasan sa makasaysayang Kabite na kinikilala sa kahusayan sa paghubog ng mga indibidwal na may pandaigdigang kakayahan at kagandahang asal.</p>
            <p></p>
            <p><strong>Mission</strong></p>
            <p><strong></strong><p>Cavite State University shall provide excellent, equitable and relevant educational opportunities in the arts, sciences and technology through quality instruction and responsive research and development activities. It shall produce professional, skilled and morally upright individuals for global competitiveness.</p>
            <p><strong>Hangarin ng Pamantasan</strong></p>
            <p>Ang Cavite State university ay makapagbigay ng mahusay, pantay at makabuluhang edukasyon sa sining, agham at teknolohiya sa pamamagitan ng may kalidad na pagtuturo at tumutugon sa pangangailangang pananaliksik at mga gawaing pangkaunlaran. Makalikha ito ng mga indibidwal ng dalubhasa, may kasaysayan at kagandahan-asal sa pandaigdigang kakayahan.</p>
            <p><strong>Objectives</strong></p>
            <p>In addition to, and in support of its mission and policies embodied in the charter, the University shall:</p>
            <ul>
                <li>provide a general education program that will promote national identity, cultural consciousness, moral integrity and spiritual vigor;</li>
                <li>train the nation's manpower in the skills required by the national development;</li>
                <li>develop professions that will provide leadership for the nation; and</li>
                li>advance knowledge through research work and apply new knowledge for improving the quality of human life and responding effectively to changing societal needs and conditions.&nbsp;</li>
            </ul>
            <p style="text-align: center;"><a href="https://cvsu-imus.edu.ph/about/vmo" target="_blank">Learn More</a></p>
            `;
        case 'seal':
            return `
            <style>
            * {
                text-align: justify;
            }
            </style>
            <p>The shape of the seal shall be square with one-third of its angles cut to form its base. It shall assume the shape of a space of a space capsule.</p>
            <p>The dominant colors of the University Seal are green and gold.</p>
            <p>The words "Cavite State University", Cavite , Philippines, 1906"  are written in gold against a dark green background around the periphery of the seal.</p>
            <p style="text-align: center;">For more information please visit <a href="https://cvsu-imus.edu.ph/about/universityseal" target="_blank">official website of the campus</a></p>
            `;
        case 'hymn':
            return `
            <p style="text-align: center;"><strong>CvSU Hymn</strong></p>
            <p style="text-align: center; ">Hail Alma Mater Dear</p><p style="text-align: center; ">CvSU all the way through</p><p style="text-align: center; ">Seat of hope that we dream of</p><p style="text-align: center; ">Under the sky so blue</p><p style="text-align: center; ">Verdant fields God’s gift to you</p><p style="text-align: center; ">Open our lives a new</p><p style="text-align: center; ">Oh, our hearts, our hands, our minds, too</p><p style="text-align: center; ">In your bossom thrive and grow.</p><p style="text-align: center; ">Seeds of hope are now in bloom</p><p style="text-align: center; ">Vigilant sons to you have sworn</p><p style="text-align: center; ">To CvSU our faith goes on</p><p style="text-align: center; ">Cradle of hope and bright vision.</p><p style="text-align: center; ">These sturdy arms that care</p><p style="text-align: center; ">Are the nation builders</p><p style="text-align: center; ">Blessed with strength and power</p><p style="text-align: center; ">To our Almighty we offer.</p><p style="text-align: center; ">We Pray for CvSU</p><p style="text-align: center; ">God’s Blessing be with you</p><p style="text-align: center; ">You’re the master, we’re the builders</p><p style="text-align: center; ">CvSU leads forever.</p>
            <br><br>
            <p style="text-align: center;"> Check it out on <a href="https://www.youtube.com/watch?v=A2fOWAo9jME" target="_blank">Youtube</a></p>
            `;
        case 'campus history':
            return `
            <style>
            * {
                text-align: justify;
            }
            </style>
            <p>Cavite State University's College of Business and Entrepreneurship launched in Imus on August 15, 2003, repurposing a building meant for the Cavite Convention and Trade Center. Initially offering programs in Business Management, Entrepreneurship, and Hotel and Restaurant Management, it expanded into Cavite State University Imus Campus in 2012. Adding programs like Computer Science, Psychology, and Education, the campus grew its facilities with a new 5-storey building, stage, and gymnasium. Strengthening ties across Cavite and Metro Manila, CvSU Imus Campus remains committed to producing globally competitive graduates through academic excellence and community service.</p>
            <p style="text-align: center;">See the full story here <a href="https://cvsu-imus.edu.ph/about/campushistory" target="_blank">on official website</a></p>
            `;
        case 'contacts':
            return `
                
                <p><strong> Campus Contact Information: </strong></p>
    
                <p> Address: Cavite Civic Center, Palico IV, Imus City, Cavite </p>
                <p> Admin Contact: (046) 471-6607 </p>
                <p> Registrar Contact: (046) 436-6584 </p>
                <p> Office Hours: Monday - Thursday: 07:00 AM - 06:00 PM </p>
                <p>For more info, visit: <a href="https://cvsu-imus.edu.ph/about/campushistory" target="_blank">Official Campus Website</a></p>
                
                <p><i>This is an automated message.</p>
            `;
        case 'goodbye':
            return 'Goodbye! Have a great day!';
        default:
            return 'I am sorry, I didn’t understand that. Can you please rephrase?';
    }
}

// Function to reset the chat messages and buttons to initial state
function resetMessages() {
    const messageContainer = document.getElementById('chat-messages');
    messageContainer.innerHTML = ''; // Clear chat messages
    messages = []; // Clear messages array
    undoStack = []; // Clear undo stack
    redoStack = []; // Clear redo stack
    buttonStates = []; // Clear button states
    updateButtons('reset'); // Reset buttons to initial state
}

// Function to undo the last message sent
function undoMessage() {
    if (undoStack.length > 0) {
        const lastMessage = undoStack.pop(); // Remove last message from undo stack
        redoStack.push(lastMessage); // Add message to redo stack
        
        // Adjust messages array based on message type (user or bot)
        if (lastMessage.type === 'bot') {
            const userMessage = undoStack.pop(); // Remove user message as well
            redoStack.push(userMessage); // Add user message to redo stack
            messages = messages.slice(0, -2); // Remove last two messages from messages array
        } else {
            messages = messages.slice(0, -1); // Remove last message from messages array
        }
        
        const messageContainer = document.getElementById('chat-messages');
        messageContainer.removeChild(messageContainer.lastChild); // Remove last message element
        
        // Remove previous user message element if undoing a bot response
        if (lastMessage.type === 'bot') {
            messageContainer.removeChild(messageContainer.lastChild); // Remove user message element
        }
        
        // Restore previous button state
        restoreButtonState();
    }
}

// Function to redo the last undone message
function redoMessage() {
    if (redoStack.length > 0) {
        const lastUndoneMessage = redoStack.pop(); // Get last undone message
        sendMessage(lastUndoneMessage.text); // Resend the message
        undoStack.push(lastUndoneMessage); // Add message back to undo stack
    }
}

// Function to save the current button state
function saveButtonState() {
    const messageInput = document.getElementById('message-input');
    const currentButtons = messageInput.innerHTML; // Get current button HTML
    buttonStates.push(currentButtons); // Save current button state
}

// Function to restore the previous button state
function restoreButtonState() {
    const messageInput = document.getElementById('message-input');
    const lastButtonState = buttonStates.pop(); // Get last saved button state
    if (lastButtonState !== undefined) {
        messageInput.innerHTML = lastButtonState; // Restore button state
    }
}


// Function to open external link (replace # with actual URLs)
function openExternalLink(url) {
    window.open(url, '_blank');
}