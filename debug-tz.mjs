import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { endOfDay, startOfDay, addMonths } from 'date-fns';

const TIMEZONE = 'Asia/Seoul';

console.log('--- Debugging KST Timezones ---');

const now = new Date('2024-01-01T01:00:00Z'); // 10:00 KST
console.log('Now (UTC):', now.toISOString());

const kstNow = toZonedTime(now, TIMEZONE);
console.log('KST Now (Date Obj):', kstNow.toISOString());

const kstEndOfDay = endOfDay(kstNow);
console.log('KST End of Day (Date Obj):', kstEndOfDay.toISOString());

const utcEndOfDay = fromZonedTime(kstEndOfDay, TIMEZONE);
console.log('UTC End of Day (Expected Query Date):', utcEndOfDay.toISOString());

const nextPaymentDate = new Date('2024-01-14T15:00:00Z'); // 2024-01-15 00:00:00 KST
console.log('Current Payment Date (UTC):', nextPaymentDate.toISOString());

const kstNextPaymentDate = toZonedTime(nextPaymentDate, TIMEZONE);
console.log('KST Current Payment Date:', kstNextPaymentDate.toISOString());

const kstNextMonth = addMonths(kstNextPaymentDate, 1);
console.log('KST Next Month:', kstNextMonth.toISOString());

const kstStartOfNextMonth = startOfDay(kstNextMonth);
console.log('KST Start of Next Month:', kstStartOfNextMonth.toISOString());

const utcNextPaymentDate = fromZonedTime(kstStartOfNextMonth, TIMEZONE);
console.log('UTC Next Payment Date:', utcNextPaymentDate.toISOString());
