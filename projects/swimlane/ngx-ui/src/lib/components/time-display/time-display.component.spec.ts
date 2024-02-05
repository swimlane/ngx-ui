import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { NgxTimeDisplayComponent as TestComponent } from './time-display.component';
import { MomentModule } from 'ngx-moment';
import moment from 'moment-timezone';
import { InjectionService } from '../../services/injection/injection.service';
import { TimeZoneModule } from '../../pipes/time-zone/time-zone.module';

const MOON_LANDING = '1969-07-20T20:17:43Z';

const allTimeZones = [
  'Africa/Abidjan',
  'Africa/Accra',
  'Africa/Addis_Ababa',
  'Africa/Algiers',
  'Africa/Asmara',
  'Africa/Bamako',
  'Africa/Bangui',
  'Africa/Banjul',
  'Africa/Bissau',
  'Africa/Blantyre',
  'Africa/Brazzaville',
  'Africa/Bujumbura',
  'Africa/Cairo',
  'Africa/Casablanca',
  'Africa/Ceuta',
  'Africa/Conakry',
  'Africa/Dakar',
  'Africa/Dar_es_Salaam',
  'Africa/Djibouti',
  'Africa/Douala',
  'Africa/El_Aaiun',
  'Africa/Freetown',
  'Africa/Gaborone',
  'Africa/Harare',
  'Africa/Johannesburg',
  'Africa/Juba',
  'Africa/Kampala',
  'Africa/Khartoum',
  'Africa/Kigali',
  'Africa/Kinshasa',
  'Africa/Lagos',
  'Africa/Libreville',
  'Africa/Lome',
  'Africa/Luanda',
  'Africa/Lubumbashi',
  'Africa/Lusaka',
  'Africa/Malabo',
  'Africa/Maputo',
  'Africa/Maseru',
  'Africa/Mbabane',
  'Africa/Mogadishu',
  'Africa/Monrovia',
  'Africa/Nairobi',
  'Africa/Ndjamena',
  'Africa/Niamey',
  'Africa/Nouakchott',
  'Africa/Ouagadougou',
  'Africa/Porto-Novo',
  'Africa/Tripoli',
  'Africa/Tunis',
  'Africa/Windhoek',
  'America/Adak',
  'America/Anchorage',
  'America/Anguilla',
  'America/Antigua',
  'America/Argentina/Buenos_Aires',
  'America/Aruba',
  'America/Asuncion',
  'America/Atikokan',
  'America/Barbados',
  'America/Belize',
  'America/Blanc-Sablon',
  'America/Bogota',
  'America/Cancun',
  'America/Caracas',
  'America/Cayenne',
  'America/Cayman',
  'America/Chicago',
  'America/Chihuahua',
  'America/Costa_Rica',
  'America/Cuiaba',
  'America/Curacao',
  'America/Danmarkshavn',
  'America/Dawson_Creek',
  'America/Denver',
  'America/Dominica',
  'America/Edmonton',
  'America/El_Salvador',
  'America/Fortaleza',
  'America/Godthab',
  'America/Grand_Turk',
  'America/Grenada',
  'America/Guadeloupe',
  'America/Guatemala',
  'America/Guayaquil',
  'America/Guyana',
  'America/Halifax',
  'America/Havana',
  'America/Hermosillo',
  'America/Jamaica',
  'America/Kralendijk',
  'America/La_Paz',
  'America/Lima',
  'America/Los_Angeles',
  'America/Lower_Princes',
  'America/Managua',
  'America/Manaus',
  'America/Marigot',
  'America/Martinique',
  'America/Matamoros',
  'America/Mexico_City',
  'America/Miquelon',
  'America/Montevideo',
  'America/Montserrat',
  'America/Nassau',
  'America/New_York',
  'America/Noronha',
  'America/Ojinaga',
  'America/Panama',
  'America/Paramaribo',
  'America/Phoenix',
  'America/Port_of_Spain',
  'America/Port-au-Prince',
  'America/Puerto_Rico',
  'America/Punta_Arenas',
  'America/Regina',
  'America/Rio_Branco',
  'America/Santiago',
  'America/Santo_Domingo',
  'America/Sao_Paulo',
  'America/Scoresbysund',
  'America/St_Barthelemy',
  'America/St_Johns',
  'America/St_Kitts',
  'America/St_Lucia',
  'America/St_Thomas',
  'America/St_Vincent',
  'America/Tegucigalpa',
  'America/Thule',
  'America/Tijuana',
  'America/Toronto',
  'America/Tortola',
  'America/Vancouver',
  'America/Winnipeg',
  'Antarctica/Casey',
  'Antarctica/Davis',
  'Antarctica/DumontDUrville',
  'Antarctica/Macquarie',
  'Antarctica/Mawson',
  'Antarctica/Palmer',
  'Antarctica/Syowa',
  'Antarctica/Vostok',
  'Arctic/Longyearbyen',
  'Asia/Aden',
  'Asia/Almaty',
  'Asia/Amman',
  'Asia/Aqtobe',
  'Asia/Ashgabat',
  'Asia/Baghdad',
  'Asia/Bahrain',
  'Asia/Baku',
  'Asia/Bangkok',
  'Asia/Beirut',
  'Asia/Bishkek',
  'Asia/Brunei',
  'Asia/Chita',
  'Asia/Colombo',
  'Asia/Damascus',
  'Asia/Dhaka',
  'Asia/Dili',
  'Asia/Dubai',
  'Asia/Dushanbe',
  'Asia/Hebron',
  'Asia/Ho_Chi_Minh',
  'Asia/Hong_Kong',
  'Asia/Hovd',
  'Asia/Irkutsk',
  'Asia/Jakarta',
  'Asia/Jayapura',
  'Asia/Jerusalem',
  'Asia/Kabul',
  'Asia/Kamchatka',
  'Asia/Karachi',
  'Asia/Kathmandu',
  'Asia/Kolkata',
  'Asia/Kuala_Lumpur',
  'Asia/Kuwait',
  'Asia/Macau',
  'Asia/Makassar',
  'Asia/Manila',
  'Asia/Muscat',
  'Asia/Nicosia',
  'Asia/Novosibirsk',
  'Asia/Omsk',
  'Asia/Phnom_Penh',
  'Asia/Pyongyang',
  'Asia/Qatar',
  'Asia/Riyadh',
  'Asia/Sakhalin',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Taipei',
  'Asia/Tashkent',
  'Asia/Tbilisi',
  'Asia/Tehran',
  'Asia/Thimphu',
  'Asia/Tokyo',
  'Asia/Ulaanbaatar',
  'Asia/Vientiane',
  'Asia/Vladivostok',
  'Asia/Yangon',
  'Asia/Yekaterinburg',
  'Asia/Yerevan',
  'Atlantic/Azores',
  'Atlantic/Bermuda',
  'Atlantic/Canary',
  'Atlantic/Cape_Verde',
  'Atlantic/Faroe',
  'Atlantic/Reykjavik',
  'Atlantic/South_Georgia',
  'Atlantic/St_Helena',
  'Atlantic/Stanley',
  'Australia/Adelaide',
  'Australia/Brisbane',
  'Australia/Darwin',
  'Australia/Eucla',
  'Australia/Lord_Howe',
  'Australia/Perth',
  'Australia/Sydney',
  'Etc/GMT+1',
  'Etc/GMT+10',
  'Etc/GMT+11',
  'Etc/GMT+12',
  'Etc/GMT+2',
  'Etc/GMT+3',
  'Etc/GMT+4',
  'Etc/GMT+5',
  'Etc/GMT+6',
  'Etc/GMT+7',
  'Etc/GMT+8',
  'Etc/GMT+9',
  'Etc/GMT-1',
  'Etc/GMT-10',
  'Etc/GMT-11',
  'Etc/GMT-12',
  'Etc/GMT-13',
  'Etc/GMT-14',
  'Etc/GMT-2',
  'Etc/GMT-3',
  'Etc/GMT-4',
  'Etc/GMT-5',
  'Etc/GMT-6',
  'Etc/GMT-7',
  'Etc/GMT-8',
  'Etc/GMT-9',
  'Etc/UTC',
  'Europe/Amsterdam',
  'Europe/Andorra',
  'Europe/Athens',
  'Europe/Belgrade',
  'Europe/Berlin',
  'Europe/Bratislava',
  'Europe/Brussels',
  'Europe/Bucharest',
  'Europe/Budapest',
  'Europe/Chisinau',
  'Europe/Copenhagen',
  'Europe/Dublin',
  'Europe/Gibraltar',
  'Europe/Guernsey',
  'Europe/Helsinki',
  'Europe/Isle_of_Man',
  'Europe/Istanbul',
  'Europe/Jersey',
  'Europe/Kaliningrad',
  'Europe/Kiev',
  'Europe/Lisbon',
  'Europe/Ljubljana',
  'Europe/London',
  'Europe/Luxembourg',
  'Europe/Madrid',
  'Europe/Malta',
  'Europe/Mariehamn',
  'Europe/Minsk',
  'Europe/Monaco',
  'Europe/Moscow',
  'Europe/Oslo',
  'Europe/Paris',
  'Europe/Podgorica',
  'Europe/Prague',
  'Europe/Riga',
  'Europe/Rome',
  'Europe/Samara',
  'Europe/San_Marino',
  'Europe/Sarajevo',
  'Europe/Skopje',
  'Europe/Sofia',
  'Europe/Stockholm',
  'Europe/Tallinn',
  'Europe/Tirane',
  'Europe/Vaduz',
  'Europe/Vatican',
  'Europe/Vienna',
  'Europe/Vilnius',
  'Europe/Volgograd',
  'Europe/Warsaw',
  'Europe/Zagreb',
  'Europe/Zurich',
  'Indian/Antananarivo',
  'Indian/Chagos',
  'Indian/Christmas',
  'Indian/Cocos',
  'Indian/Comoro',
  'Indian/Kerguelen',
  'Indian/Mahe',
  'Indian/Maldives',
  'Indian/Mauritius',
  'Indian/Mayotte',
  'Indian/Reunion',
  'Pacific/Apia',
  'Pacific/Auckland',
  'Pacific/Bougainville',
  'Pacific/Chatham',
  'Pacific/Chuuk',
  'Pacific/Easter',
  'Pacific/Efate',
  'Pacific/Enderbury',
  'Pacific/Fakaofo',
  'Pacific/Fiji',
  'Pacific/Funafuti',
  'Pacific/Galapagos',
  'Pacific/Gambier',
  'Pacific/Guadalcanal',
  'Pacific/Guam',
  'Pacific/Honolulu',
  'Pacific/Kiritimati',
  'Pacific/Majuro',
  'Pacific/Marquesas',
  'Pacific/Nauru',
  'Pacific/Niue',
  'Pacific/Norfolk',
  'Pacific/Noumea',
  'Pacific/Pago_Pago',
  'Pacific/Palau',
  'Pacific/Pitcairn',
  'Pacific/Pohnpei',
  'Pacific/Port_Moresby',
  'Pacific/Rarotonga',
  'Pacific/Saipan',
  'Pacific/Tahiti',
  'Pacific/Tarawa',
  'Pacific/Tongatapu',
  'Pacific/Wake',
  'Pacific/Wallis'
];

describe('NgxTimeDisplayComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MomentModule, ClipboardModule, TimeZoneModule],
      declarations: [TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [InjectionService],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set defaults', () => {
    expect(component.datetime).toBeDefined(Date);
    expect(component.defaultInputTimeZone).toBeUndefined();
    expect(component.timezone).toEqual('America/Los_Angeles');
    expect(component.mode).toBe('timezone');
    expect(component.tooltipFormat).toBe('llll Z [(]zz[)]');
    expect(component.clipFormat).toBe('L LT Z');
    expect(component.timezones.UTC).toEqual('Etc/UTC');
    expect(component.timezones.Local).toEqual('');
  });

  it('should support all timezones', () => {
    component.datetime = new Date();

    component.timezones = allTimeZones.reduce((acc, curr, index) => {
      acc[`Zone [${index}]`] = curr;
      return acc;
    }, {});

    component.ngOnChanges();
    fixture.detectChanges();

    expect(Object.keys(component.timeValues).length).toEqual(allTimeZones.length);

    for (const key in component.timeValues) {
      expect(component.timeValues[key]).toBeTruthy();
      expect(component.timeValues[key]).not.toContain('Coordinated Universal Time');
    }
  });

  describe('should set timeValues and titleValue', () => {
    it('current date when no date provided', () => {
      component.ngOnChanges();
      fixture.detectChanges();

      expect(component.internalDatetime).toBeDefined();

      expect(Object.keys(component.timeValues).length).toEqual(2);
      expect(component.titleValue).toContain('[Local]');
      expect(component.titleValue).toContain('[UTC]');
    });

    it('when user date provided', () => {
      const date = '2000-02-05 8:30 AM';
      component.datetime = new Date(date); // note: browser timezone
      component.tooltipFormat = 'fullDateTime';

      component.ngOnChanges();
      fixture.detectChanges();

      expect(component.internalDatetime.toDateString()).toEqual('Sat Feb 05 2000');

      expect(Object.keys(component.timeValues).length).toEqual(2);
      expect(component.titleValue).toContain('Sat, Feb 5, 2000 8:30 AM -08:00 (PST)'); // note: need TZ set to PST
      expect(component.titleValue).toContain('[Local]');

      // expect(component.titleValue).toContain('Feb 05, 2000 08:30 AM');
      expect(component.titleValue).toContain('[UTC]');

      for (const key in component.timeValues) {
        expect(component.timeValues[key]).toBeTruthy();
        expect(component.timeValues[key]).not.toContain('Coordinated Universal Time');
      }
    });

    it('when iso date provided', () => {
      component.datetime = new Date(MOON_LANDING); // note: browser UTC
      component.tooltipFormat = 'fullDateTime';

      component.ngOnChanges();
      fixture.detectChanges();

      expect(component.internalDatetime.toDateString()).toEqual('Sun Jul 20 1969');

      expect(Object.keys(component.timeValues).length).toEqual(2);
      expect(component.titleValue).toContain('[Local]');

      expect(component.titleValue).toContain('Sun, Jul 20, 1969 8:17 PM +00:00 (UTC)'); // note: defaults to UTC
      expect(component.titleValue).toContain('[UTC]');

      for (const key in component.timeValues) {
        expect(component.timeValues[key]).toBeTruthy();
        expect(component.timeValues[key]).not.toContain('Coordinated Universal Time');
      }
    });
  });

  describe('should handle bad inputs', () => {
    it('should handle bad date', () => {
      (moment as any).suppressDeprecationWarnings = true;
      component.datetime = 'Tomarrow';

      component.ngOnChanges();
      fixture.detectChanges();

      expect(Object.keys(component.timeValues).length).toEqual(0);
    });

    it('should handle bad timezone', () => {
      (moment as any).suppressDeprecationWarnings = true;
      component.datetime = new Date();
      component.tooltipFormat = 'fullDateTime';

      component.timezones = {
        Test: 'Timbuktu'
      };

      component.ngOnChanges();
      fixture.detectChanges();

      expect(component.timeValues['Test'].display).toContain('Coordinated Universal Time');
    });
  });
});
