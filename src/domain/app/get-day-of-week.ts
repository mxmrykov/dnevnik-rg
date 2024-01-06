export default function GetDayOfWeek(): string {
    const dayOfWeek = new Date(Date.now()).getDay();
    return isNaN(dayOfWeek) ? null :
        ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'][dayOfWeek];

}