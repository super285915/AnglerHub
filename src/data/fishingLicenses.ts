import { FishingLicense } from '../types';

export const fishingLicenses: FishingLicense[] = [
  {
    id: '1',
    state: 'California',
    annualFee: '$52.66',
    requirements: 'All anglers 16 years and older must have a license',
    validPeriod: 'January 1 - December 31',
    website: 'https://wildlife.ca.gov/Licensing/Fishing',
    additionalInfo: 'Sport fishing report card required for certain species',
    imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    state: 'Florida',
    annualFee: '$17.00',
    requirements: 'All anglers 16 years and older must have a license',
    validPeriod: '12 months from date of purchase',
    website: 'https://myfwc.com/license/',
    additionalInfo: 'Separate saltwater and freshwater licenses available',
    imageUrl: 'https://images.pexels.com/photos/2131904/pexels-photo-2131904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    state: 'Texas',
    annualFee: '$30.00',
    requirements: 'All anglers 17 years and older must have a license',
    validPeriod: 'August 31 - August 30',
    website: 'https://tpwd.texas.gov/business/licenses/online_sales/',
    additionalInfo: 'All-water fishing package available for both freshwater and saltwater',
    imageUrl: 'https://images.pexels.com/photos/5560911/pexels-photo-5560911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    state: 'Michigan',
    annualFee: '$26.00',
    requirements: 'All anglers 17 years and older must have a license',
    validPeriod: 'March 1 - March 31 of the following year',
    website: 'https://www.michigan.gov/dnr/buy-and-apply/fishing-licenses',
    additionalInfo: '24-hour and 72-hour licenses available for non-residents',
    imageUrl: 'https://images.pexels.com/photos/2131882/pexels-photo-2131882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    state: 'New York',
    annualFee: '$25.00',
    requirements: 'All anglers 16 years and older must have a license',
    validPeriod: '365 days from date of purchase',
    website: 'https://www.dec.ny.gov/permits/6091.html',
    additionalInfo: 'Marine registry required for saltwater fishing',
    imageUrl: 'https://images.pexels.com/photos/1630039/pexels-photo-1630039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    state: 'Colorado',
    annualFee: '$36.08',
    requirements: 'All anglers 16 years and older must have a license',
    validPeriod: 'April 1 - March 31 of the following year',
    website: 'https://cpw.state.co.us/buyapply/Pages/Fishing.aspx',
    additionalInfo: 'Habitat stamp required for anglers 18-64 years old',
    imageUrl: 'https://images.pexels.com/photos/5560947/pexels-photo-5560947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '7',
    state: 'Minnesota',
    annualFee: '$25.00',
    requirements: 'All anglers 16 years and older must have a license',
    validPeriod: 'March 1 - February 28/29 of the following year',
    website: 'https://www.dnr.state.mn.us/licenses/fishing/index.html',
    additionalInfo: 'Trout stamp required for designated trout waters',
    imageUrl: 'https://images.pexels.com/photos/5560972/pexels-photo-5560972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '8',
    state: 'Alaska',
    annualFee: '$20.00 (resident), $100.00 (non-resident)',
    requirements: 'All anglers 18 years and older must have a license',
    validPeriod: 'Calendar year',
    website: 'https://www.adfg.alaska.gov/index.cfm?adfg=license.main',
    additionalInfo: 'King salmon stamp required for king salmon fishing',
    imageUrl: 'https://images.pexels.com/photos/6485191/pexels-photo-6485191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];
