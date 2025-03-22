import winston from 'winston';
import moment from 'moment';

const timestamp = () => moment().format('"YYYY/MM hh:mm:ss"');

const gettingErrorMessage = (log) => {
	if (log.message) {
		return log.message
	}
	if (log?.sql) {
		return log.sql
	}
	if (log?.name) {
		return log.name
	}
	return "couldn't getting error message"
}

const dir = (cat) => {
	let m = moment().format("MMM")
	let d = moment().format("DD")
	return `${__dirname}../../../logs/${m}/${cat}-${d}.log`
}

const transport = {
	console: new winston.transports.Console({
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.timestamp(),
			winston.format.prettyPrint(),
			winston.format.metadata(),
			winston.format.printf((log) => `[${timestamp()}] ${log.level}: ${log.message}`),
		),
	}),
	file: [
		// new winston.transports.File({
		// 	level: 'info',
		// 	filename: `${dir()}/info.log`,
		// 	format: winston.format.combine(
		// 		// winston.format.colorize(),
		// 		winston.format.timestamp({
		// 			format: 'DD-MM-YYYY HH:mm:ss',
		// 		}),
		// 		winston.format.prettyPrint(),
		// 		winston.format.metadata(),
		// 		winston.format.printf((log) => `[${timestamp()}] ${log.level.toUpperCase()}: ${log.message} \n${JSON.stringify(log.metadata, null, 2)} \n`),
		// 	),
		// }),
		new winston.transports.File({
			level: 'warn',
			filename: `${dir("warn")}`,
			format: winston.format.combine(
				// winston.format.colorize(),
				winston.format.timestamp({
					format: 'DD-MM-YYYY HH:mm:ss',
				}),
				winston.format.prettyPrint(),
				winston.format.metadata(),
				winston.format.printf((log) => `[${timestamp()}] ${log.level.toUpperCase()}: ${log.message} \n${JSON.stringify(log.metadata, null, 2)} \n`),
			),
		}),
		new winston.transports.File({
			level: 'error',
			filename: `${dir("error")}`,
			format: winston.format.combine(
				// winston.format.colorize(),
				winston.format.timestamp({
					format: 'DD-MM-YYYY HH:mm:ss',
				}),
				winston.format.prettyPrint(),
				winston.format.metadata(),
				winston.format.printf((log) => `[${timestamp()}] ${log.level.toUpperCase()}: ${gettingErrorMessage(log)} \n${JSON.stringify(log.metadata, null, 2)} \n`),
			),
		}),
		// new winston.transports.File({
		// 	level: 'debug',
		// 	filename: `${dir()}/debug.log`,
		// 	format: winston.format.combine(
		// 		// winston.format.colorize(),
		// 		winston.format.timestamp({
		// 			format: 'DD-MM-YYYY HH:mm:ss',
		// 		}),
		// 		winston.format.prettyPrint(),
		// 		winston.format.metadata(),
		// 		winston.format.printf((log) => `[${timestamp()}] ${log.level.toUpperCase()}: ${log.message} \n${JSON.stringify(log.metadata, null, 2)} \n`),
		// 	),
		// }),
	],
};


const logger = winston.createLogger({
	// levels: winston.config.syslog.levels,
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 3,
	},
	exitOnError: false,
	transports: [
		transport.console,
		...transport.file,
	],
});
winston.addColors({
	error: 'red',
	warn: 'yellow',
	info: 'cyan',
	debug: 'green',
});

// export const expressLogger = expressWinston.logger({
// 	transports: [
// 		transport.console,
// 		...transport.file,
// 	],
// });

export default logger;