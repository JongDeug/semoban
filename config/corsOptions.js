const whitelist = ['https://localhost:3500', 'https://www.google.com'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) { //localhost로 들어오면 undefined임 !undefined = true임.
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}