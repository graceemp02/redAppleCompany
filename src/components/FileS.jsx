/** @format */

import { Alert, Button, Typography, Box, LinearProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MyDialog from './MyDialog';
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress sx={{ borderRadius: '100vw' }} variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const FileInput = ({ lable, name, sName }) => {
  const [dialog, setDialog] = useState({ status: false, msg: '', title: '' });
  const id = localStorage.getItem('com_id');
  const fileRef = useRef(null);
  const [status, setStatus] = useState(0);
  const [progress, setProgress] = useState(0);
  const getStatus = async () => {
    await axios
      .get(`fileInput.php?id=${id}&status=${sName}`)
      .then(res => setStatus(+res.data.res))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getStatus();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => getStatus(), 1000);
    return () => clearInterval(interval);
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();
    let fd = new FormData();
    fd.append('id', id);
    fd.append('fileInput', fileRef.current.files[0]);
    fd.append('name', name);
    fd.append('status', sName);
    await axios
      .post(`fileInput.php`, fd, {
        onUploadProgress: ({ loaded, total }) => {
          const p = Math.round((loaded / total) * 100);
          setProgress(p);
        },
      })
      .then(res => {
        if (res.data.res === 'true') {
          setStatus(1);
          setDialog({
            status: true,
            title: 'Success',
            msg: `${fileRef.current.files[0].name} is Uploaded Successfully`,
          });
        } else {
          setDialog({
            msg: 'Sorry, there was an error uploading your file. Please try again',
            title: 'FAILURE',
            status: true,
          });
        }
      })
      .catch(err => console.log(err));
    fileRef.current.value = null;
  };

  return (
    <>
      <div className='input-column'>
        <Typography className='input-lable'>{lable}</Typography>
        <form className='inner-file-form' onSubmit={handleSubmit}>
          <input required accept='.pdf,.png,.jpg,jpeg' type='file' ref={fileRef} />
          <Button color='success' type='submit' variant='contained' sx={{ mr: 1 }}>
            Upload
          </Button>
          {status === 1 ? (
            <Alert className='alert' variant='filled' color='warning' severity='info'>
              In Process
            </Alert>
          ) : status === 2 ? (
            <Alert className='alert' variant='filled' severity='success'>
              Approved
            </Alert>
          ) : status === 3 ? (
            <Alert
              className='alert'
              variant='filled'
              color='error'
              iconMapping={{
                success: <WarningAmberIcon fontSize='inherit' />,
              }}>
              Rejected
            </Alert>
          ) : (
            <Alert className='alert' severity='warning'>
              Not Uploaded
            </Alert>
          )}
        </form>
        {progress > 0 && progress < 100 && (
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        )}
      </div>

      {dialog.status && (
        <MyDialog
          title={dialog.title}
          des={dialog.msg}
          actions={[{ onClick: () => setDialog({ status: false }), color: 'primary', text: 'OK' }]}
        />
      )}
    </>
  );
};

export default FileInput;
