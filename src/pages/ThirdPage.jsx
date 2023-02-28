/** @format */

import { Stack } from '@mui/system';
import FileC from '../components/FileC';
import TextInput from '../components/TextInput';
import FileS from '../components/FileS';

const ThirdPage = () => {
  return (
    <Stack direction='column' gap='.7vh'>
      <TextInput name='companyName' lable='Name of the Company' type='text' />
      <TextInput name='projectManager' lable='Project Manager' type='text' />
      <FileC name='ackDesign' lable='Acknowledgement of Design and Criteria Per Job' />
      <FileS
        sName='roughFauStatus'
        name='roughFau'
        lable='Rough FAU set up- Pictures (Convert the pictures in signle PDF file and then attacth)'
      />
      <FileS sName='roughDuctStatus' name='roughDuct' lable='Rough Ductwork Design' />
      <FileS
        sName='roughWiringStatus'
        name='roughWiring'
        lable='Rough Wiring Pictures (Convert the pictures in signle PDF file and then attacth)'
      />
      <FileS
        sName='roughTVStatus'
        name='roughTV'
        lable='Rough TV Mount Locations Showing Wiring as well'
      />
      <FileC name='outdoorSensorLoc' lable='All Indoor Sensor Locations Written in Software' />
      <FileC name='outdoorSensorLoc' lable='All Outdoor Sensor Locations Written in Software' />
      <FileC name='contract' lable='Contract Agreement Signed' />
    </Stack>
  );
};

export default ThirdPage;
