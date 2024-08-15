export default function GetDayOfWeek(): string {
    const dayOfWeek = new Date(Date.now()).getDay();
    return isNaN(dayOfWeek) ? null :
        ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'][dayOfWeek];

}

export function getMonthName(num: number): string {
    const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
    return monthNames[num]
}