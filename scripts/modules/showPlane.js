import createElement from "./createElement.js";

const createCockpit = (titleText) => {
    const cockpit = createElement('div', {
        className: 'cockpit',
    });

    const title = createElement('h1', {
        className: 'cockpit-title',
        textContent: titleText,
    });

    const button = createElement('button', {
        className: 'cockpit-confirm',
        type: 'submit',
        textContent: 'Подтвердить',
    });

    cockpit.append(title, button);
    return cockpit;
};

const createExit = () => {
    const fuselage = createElement('div', {
        className: 'exit fuselage',
    });

    return fuselage;
};

const createBlockSeat = (n, count) => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    const fuselage = createElement('ol', {
        className: 'fuselage',
    });

    for (let i = n; i < count + n; i++) {
        const wrapperRow = createElement('li');
        const seats = createElement('ol', {
            className: 'seats',
        });

        const seatsRow = letters.map(letter => {
            const seat = createElement('li', {
                className: 'seat',
            })
            const wrapperCheck = createElement('label');
            const check = createElement('input', {
                name: 'seat',
                type: 'checkbox',
                value: `${i}${letter}`,
            });

            wrapperCheck.append(check);
            seat.append(wrapperCheck)
            return seat;
        });

        seats.append(...seatsRow);
        wrapperRow.append(seats);
        fuselage.append(wrapperRow);
    }

    return fuselage;
};

const createPlane = (title, scheme) => {
    const choisesSeat = createElement('form', {
        className: 'choises-seat',
    });

    const plane = createElement('fieldset', {
        className: 'plane',
        name: 'plane',
    });

    const cockpit = createCockpit(title);

    let n = 1;

    const elements = scheme.map((type) => {
        if (type === 'exit') {
            return createExit();
        }
        if (typeof type === 'number') {
            const blockSeat = createBlockSeat(n, type);
            n = n + type;
            return blockSeat;
        }
    });

    plane.append(cockpit, ...elements);
    choisesSeat.append(plane);
    return choisesSeat;
};

const declOfNum = (n, titles) => {
    return (
      n +
      " " +
      titles[
        n % 10 === 1 && n % 100 !== 11
          ? 0
          : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? 1
          : 2
      ]
    );
  };

const showPlane = (main, data) => {
    const t = declOfNum(data.length, ["место", "места", "мест"]);
    const title = `Выберите ${t}`;
    const scheme = ['exit', 11, 'exit', 1, 'exit', 17, 'exit'];

    main.append(createPlane(title, scheme));
};

export default showPlane;