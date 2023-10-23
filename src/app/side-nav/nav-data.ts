import { faChartLine, faDashboard, faListCheck } from "@fortawesome/free-solid-svg-icons";

export const navbarData = [
    {
        routerLink:'dashboard',
        icon: faChartLine,
        label: 'Dashboard',
    },

    {
        routerLink:'Tarefas',
        icon: faListCheck,
        label: 'Adicionar Tarefa'
    }
];