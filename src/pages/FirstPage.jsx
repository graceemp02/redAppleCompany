/** @format */

import { Stack } from '@mui/system';
import FileInput from '../components/FileInput';
import TextInput from '../components/TextInput';

const FirstPage = () => {
  return (
    <Stack direction='column' gap='.7vh'>
      <FileInput name='outEnvReport' lable='Outdoor Environmental Report' />
      <FileInput name='inEnvReport' lable='Indoor Environmental Report' />
      <FileInput name='engrDesign' lable='Blue Print and Engineering Design' />
      <FileInput name='outAirAssessment' lable='Outdoor Air Flow Directional Assessment' />
      <FileInput
        name='layoutCleanAir'
        lable='Layout of Clean to Less Clean Air within Confined Space'
      />
      <TextInput name='acType' lable='Type of AC Systems' type='text' />
      <TextInput name='model' lable='Model Number' type='text' />
      <TextInput name='units' lable='Number of Units' type='number' />
    </Stack>
  );
};

export default FirstPage;
