document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById('resume-form');
    var resumeOutput = document.getElementById('resume-output');
    var resumeContent = document.getElementById('resume-content');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            alert("Please fill out all required fields.");
            return;
        }
        var formData = new FormData(form);
        var resumeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            education: formData.get('education'),
            skills: formData.get('skills').split(',').map(function (skill) { return skill.trim(); }),
            experience: formData.get('experience'),
            hobbies: formData.get('hobbies').split(',').map(function (hobby) { return hobby.trim(); })
        };
        var resumeHtml = "\n            <h2 class=\"editable\" contenteditable=\"true\" data-field=\"name\">".concat(resumeData.name, "</h2>\n            <p class=\"editable\" contenteditable=\"true\" data-field=\"email\">Email: ").concat(resumeData.email, "</p>\n            <p class=\"editable\" contenteditable=\"true\" data-field=\"phone\">Phone: ").concat(resumeData.phone, "</p>\n            <h3 class=\"editable\" contenteditable=\"true\" data-field=\"education-title\">Education</h3>\n            <p class=\"editable\" contenteditable=\"true\" data-field=\"education\">").concat(resumeData.education, "</p>\n            <h3 class=\"editable\" contenteditable=\"true\" data-field=\"skills-title\">Skills</h3>\n            <ul class=\"editable\" contenteditable=\"true\" data-field=\"skills\">").concat(resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n            <h3 class=\"editable\" contenteditable=\"true\" data-field=\"experience-title\">Work Experience</h3>\n            <p class=\"editable\" contenteditable=\"true\" data-field=\"experience\">").concat(resumeData.experience, "</p>\n            <h3 class=\"editable\" contenteditable=\"true\" data-field=\"hobbies-title\">Hobbies</h3>\n            <ul class=\"editable\" contenteditable=\"true\" data-field=\"hobbies\">").concat(resumeData.hobbies.map(function (hobby) { return "<li>".concat(hobby, "</li>"); }).join(''), "</ul>\n        ");
        resumeContent.innerHTML = resumeHtml;
        resumeOutput.classList.remove('hidden');
        // Add event listener for dynamic content editing
        resumeContent.addEventListener('input', handleContentChange);
    });
    function handleContentChange(event) {
        var target = event.target;
        if (target && target.classList.contains('editable')) {
            var field = target.getAttribute('data-field');
            var value = target.innerHTML;
            if (field) {
                var input = document.querySelector("input[name=".concat(field, "], textarea[name=").concat(field, "]"));
                if (input) {
                    if (input.tagName === 'TEXTAREA') {
                        input.value = value;
                    }
                    else {
                        input.value = value;
                    }
                }
            }
        }
    }
});
