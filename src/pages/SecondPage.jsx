/** @format */

import { Stack } from '@mui/system';
import FileCS from '../components/FileCS';

const SecondPage = () => {
  return (
    <Stack direction='column' gap='.7vh'>
      <FileCS
        sName='bpApproveFauStatus'
        name='bpApproveFau'
        lable='Blue Print with Approved FAU Locations'
      />
      <FileCS
        sName='bpApproveSupplyStatus'
        name='bpApproveSupply'
        lable='Blue Print with Approved Supply and Return Locations'
      />
      <FileCS
        sName='bpIndoorStatus'
        name='bpIndoor'
        lable='Blue Print with All Indoor Sensor Approved Location'
      />
      <FileCS
        sName='bpOutdoorStatus'
        name='bpOutdoor'
        lable='Blue Print with All Outdoor Sensor Approved Location'
      />
      <FileCS
        sName='bpExhaustStatus'
        name='bpExhaust'
        lable='Blue Print with All Exhaust Locations Stated'
      />
      <FileCS
        sName='bpFreshStatus'
        name='bpFresh'
        lable='Blue Print with All Fresh Air Locations Entries Stated'
      />
      <FileCS sName='bpPlcStatus' name='bpPlc' lable='Blue Print with PLC Locations' />
      <FileCS
        sName='bpDashStatus'
        name='bpDash'
        lable='Blue Print with All Dash Screen Locations'
      />
      <FileCS
        sName='bpHvacStatus'
        name='bpHvac'
        lable='Blue Print to Verify that all HVAC Unit have Fresh Air Canceled'
      />
    </Stack>
  );
};

export default SecondPage;
