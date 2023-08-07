import {getMonHoc} from '../../homeService';

export const DataTNHori = [
  {
    thu: 'HAI',
    ngay: '31',
  },
  {
    thu: 'BA',
    ngay: '1',
  },
  {
    thu: 'TƯ',
    ngay: '2',
  },
  {
    thu: 'NĂM',
    ngay: '3',
  },
  {
    thu: 'SÁU',
    ngay: '4',
  },
  {
    thu: 'BẢY',
    ngay: '5',
  },
  {
    thu: 'CN',
    ngay: '6',
  },
  {
    thu: 'HAI',
    ngay: '7',
  },
  {
    thu: 'BA',
    ngay: '8',
  },
  {
    thu: 'TƯ',
    ngay: '9',
  },
  {
    thu: 'NĂM',
    ngay: '10',
  },
  {
    thu: 'SÁU',
    ngay: '11',
  },
  {
    thu: 'BẢY',
    ngay: '12',
  },
  {
    thu: 'CN',
    ngay: '13',
  },
  {
    thu: 'HAI',
    ngay: '14',
  },
];

const DataLHHAI = [
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: NodeJS và React Native',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: NodeJS và ứng dụng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
];

DataTNHori.find(item => item.ngay === '4').dataLH = DataLHHAI;

const DataLHBA = [
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: NodeJS và React Native',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '15:15',
    dateEnd: '17:15',
    subject: 'Môn: NodeJS và ứng dụng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
];

DataTNHori.find(item => item.ngay === '5').dataLH = DataLHBA;

const DataLHTU = [
  {
    dateStart: '13:00',
    dateEnd: '15:00',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '13:00',
    dateEnd: '15:00',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '13:00',
    dateEnd: '15:00',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
  {
    dateStart: '13:00',
    dateEnd: '15:00',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
];

DataTNHori.find(item => item.ngay === '6').dataLH = DataLHTU;

const DataLHNAM = [
  {
    dateStart: '13:00',
    dateEnd: '15:00',
    subject: 'Môn: Lập trình hướng đối tượng',
    class: 'Lớp: 18TCLC_DT2',
    room: 'Phòng: T1102',
    teacher: 'GV: trungnd',
    next: require('../../../../../media/img/forward_25px.png'),
  },
];

DataTNHori.find(item => item.ngay === '7').dataLH = DataLHNAM;
