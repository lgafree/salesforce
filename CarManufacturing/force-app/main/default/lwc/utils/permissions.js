const profiles = {
    "System Administrator": {
        car: {
            view: true,
            create: true
        },
        carModel: {
            view: true,
            viewAll: true,
            create: true,
            edit: true
        },
        campaign: {
            view: true,
            viewAll: true,
            create: true,
            edit: true
        },
        carsDisplay: {
            view: true,
            edit: true
        },
        lead: {
            view: true,
            create: true,
            edit: true
        },
        account: {
            view: true,
            create: true,
            edit: true
        },
        contact: {
            view: true,
            create: true,
            edit: true
        },
        booking: {
            view: true,
            edit: true
        },
        case: {
            view: true,
            create: true,
            edit: true
        }
    },
    "Company Executive": {
        car: {
            view: true,
            create: true
        },
        carModel: {
            view: true,
            viewAll: true,
            edit: true
        },
        carsDisplay: {
            view: true,
            edit: true
        }
    },
    "Factory Executive": {
        carModel: {
            view: true,
            viewAll: true,
            create: true,
            edit: true
        }
    },
    "Quality Analyst": {
        carModel: {
            view: true,
            edit: true
        }
    },
    "Sales Executive": {
        carsDisplay: {
            view: true,
            edit: true
        },
        lead: {
            view: true,
            create: true,
            edit: true
        },
        account: {
            view: true,
            create: true,
            edit: true
        },
        contact: {
            view: true,
            create: true,
            edit: true
        }
    },
    "Digital Marketers": {
        campaign: {
            view: true,
            viewAll: true,
            create: true,
            edit: true
        }
    },
    "Car Dealers": {},
    "Customer Service Representative": {
        case: {
            view: true,
            create: true,
            edit: true
        }
    },
    "Customer": {
        carsDisplay: {
            view: true,
        },
        booking: {
            view: true, //his own record
        }
    },
    "Regional Head": {
        booking: {
            view: true,
            edit: true
        }
    }
}

export {profiles}