import {format} from 'date-fns';

export const supervisionType = {
  positive: 'Sim',
  negavite: 'Nao',
};

export const today = format(new Date(), 'dd/MM/yyyy');

export const PLACEHOLDERS = {
  farmer: 'Fazendeiro',
  farmName: 'Nome da Fazenda',
  farmLocation: 'Local da Fazenda',
  hadSupervision: 'Teve supervisão?',
  supervisiorName: 'Nome do suprevisor',
  numberOfCowsHeads: 'Numero de cabeças de gado',
  amounOfMilkProduced: 'Quantidade de leite produzido',
  checklistType: 'Tipo de checklist',
};

export const CHECKLIST_TYPES = {
  BPA: 'BPA',
  BPF: 'BPF',
  ANTIBIOTIC: 'ANTIBIÓTICO',
};
