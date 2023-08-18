export const getFormatedDate = (date: Date): string => {
    const creationSeconds: string = date.getSeconds() < 10
    ? `0${date.getSeconds()}`
    : date.getSeconds().toString();
    const creationMinutes: string = date.getMinutes() < 10
    ? `0${date.getMinutes()}`
    : date.getMinutes().toString();
    const creationHours: string = date.getHours() < 10
    ? `0${date.getHours()}`
    : date.getHours().toString();
    const creationDay: string = date.getDate() < 10
      ? `0${date.getDate()}`
      : date.getDate().toString();
    const creationMonth: string = date.getMonth() < 10
    ? `0${date.getMonth()}`
    : date.getMonth().toString();
    const creationYear: number = date.getFullYear();

    return `${creationDay}/${creationMonth}/${creationYear} ${creationHours}:${creationMinutes}:${creationSeconds}`;
}