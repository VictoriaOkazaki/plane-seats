import showPlane from "./showPlane.js";

const readyPlane = (forms, main, tourData) => {
    const data = [];

    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            for (const element of form.elements) {
                element.disabled = true;
            }

            data.push({
                name: form.name.value,
                ticket: form.ticket.value
            });

            if (forms.length === data.length) {
                forms.forEach(form => form.remove());
                showPlane(main, data, tourData);
            }
        });
    })
};

export default readyPlane;