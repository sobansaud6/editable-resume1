interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string;
    skills: string[];
    experience: string;
    hobbies: string[];
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeOutput = document.getElementById('resume-output') as HTMLElement;
    const resumeContent = document.getElementById('resume-content') as HTMLElement;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            alert("Please fill out all required fields.");
            return;
        }

        const formData = new FormData(form);
        const resumeData: ResumeData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            education: formData.get('education') as string,
            skills: (formData.get('skills') as string).split(',').map(skill => skill.trim()),
            experience: formData.get('experience') as string,
            hobbies: (formData.get('hobbies') as string).split(',').map(hobby => hobby.trim())
        };

        const resumeHtml = `
            <h2 class="editable" contenteditable="true" data-field="name">${resumeData.name}</h2>
            <p class="editable" contenteditable="true" data-field="email">Email: ${resumeData.email}</p>
            <p class="editable" contenteditable="true" data-field="phone">Phone: ${resumeData.phone}</p>
            <h3 class="editable" contenteditable="true" data-field="education-title">Education</h3>
            <p class="editable" contenteditable="true" data-field="education">${resumeData.education}</p>
            <h3 class="editable" contenteditable="true" data-field="skills-title">Skills</h3>
            <ul class="editable" contenteditable="true" data-field="skills">${resumeData.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
            <h3 class="editable" contenteditable="true" data-field="experience-title">Work Experience</h3>
            <p class="editable" contenteditable="true" data-field="experience">${resumeData.experience}</p>
            <h3 class="editable" contenteditable="true" data-field="hobbies-title">Hobbies</h3>
            <ul class="editable" contenteditable="true" data-field="hobbies">${resumeData.hobbies.map(hobby => `<li>${hobby}</li>`).join('')}</ul>
        `;

        resumeContent.innerHTML = resumeHtml;
        resumeOutput.classList.remove('hidden');

        // Add event listener for dynamic content editing
        resumeContent.addEventListener('input', handleContentChange);
    });

    function handleContentChange(event: Event) {
        const target = event.target as HTMLElement;
        if (target && target.classList.contains('editable')) {
            const field = target.getAttribute('data-field');
            const value = target.innerHTML;

            if (field) {
                const input = document.querySelector(`input[name=${field}], textarea[name=${field}]`) as HTMLInputElement | HTMLTextAreaElement;
                if (input) {
                    if (input.tagName === 'TEXTAREA') {
                        input.value = value;
                    } else {
                        input.value = value;
                    }
                }
            }
        }
    }
});
