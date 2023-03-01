/** @format */

import { Alert, Button, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MyDialog from './MyDialog';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const FileInput = ({ lable, name }) => {
  const [value, setValue] = useState(dayjs(new Date()));
  const [dialog, setDialog] = useState({ status: false, msg: '', title: '' });
  const id = localStorage.getItem('com_id');
  const [shrk, setShrk] = useState();
  const ref = useRef();
  useEffect(() => {
    axios
      .get(`txtInput.php?id=${id}&name=${name}`)
      .then(res => {
        const data = res.data.res;
        if (data) {
          setShrk(true);
          setValue(data);
        }
      })
      .catch(err => console.log(err));
  }, [id, name]);
  const handleSubmit = async e => {
    const date = `${value.$y}-${value.$M + 1}-${value.$D}`;
    e.preventDefault();
    let fd = new FormData();
    fd.append('id', id);
    fd.append('txtInput', date);
    fd.append('name', name);
    await axios
      .post(`txtInput.php`, fd)
      .then(res => {
        if (res.data.res === 'true') {
          setShrk(true);
          setDialog({
            status: true,
            title: 'Success',
            msg: ` Updated Successfully`,
          });
        } else {
          setDialog({
            msg: 'Sorry, there was an error. Please try again',
            title: 'FAILURE',
            status: true,
          });
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div className='input-column'>
      <Typography className='input-lable'>{lable}</Typography>
      <form className='inner-txt-form' onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputFormat='MMMM DD, YYYY'
            required
            label='Termination Date'
            ref={ref}
            value={value}
            onChange={newValue => setValue(newValue)}
            renderInput={params => (
              <TextField
                required
                fullWidth
                InputLabelProps={{ shrink: shrk }}
                size='small'
                sx={{ flex: 1, fontSize: '1.7vh', mr: 1, display: 'inline' }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <div className='text-btn-status' style={{ display: 'flex' }}>
          <Button color='success' type='submit' variant='contained' sx={{ mr: 1 }}>
            Upload
          </Button>

          {shrk ? (
            <Alert className='alert' severity='success'>
              Uploaded
            </Alert>
          ) : (
            <Alert className='alert' severity='warning'>
              Not Uploaded
            </Alert>
          )}
        </div>
      </form>

      {dialog.status && (
        <MyDialog
          title={dialog.title}
          des={dialog.msg}
          actions={[{ onClick: () => setDialog({ status: false }), color: 'primary', text: 'OK' }]}
        />
      )}
    </div>
  );
};

export default FileInput;
