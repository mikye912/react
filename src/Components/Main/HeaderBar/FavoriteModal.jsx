import { useContext, memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios  from 'axios';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';
import { UserContext } from "../../../Context/userContext";
import { useSelector } from "react-redux";
import common from "Common/common";

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }

const FavoriteModal = ({setUserMenu}) => {
  console.log("favorite 렌더링")

  const isSider = useSelector((state) => state.sidebarState)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    if(open) {
      axios.get('/api/Main/HeaderBar/getUserFav',{
        headers : {
          x_auth : sessionStorage.getItem("token")
        }
      }).then((res) => {
        const leftArr = res.data.filter(obj => obj.USE_YN === 'N');
        const rightArr = res.data.filter(obj => obj.USE_YN === 'Y');
        setLeft(leftArr);
        setRight(rightArr);
      }).catch((err) => {
        common.apiVerify(err);
      })
    }
  },[open])
  
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    // setLeft 하고 left의 SORT를 가지고 오름차순으로 정렬
    setLeft(left.concat(rightChecked).sort((a, b)=>{
      return a.SORT1 - b.SORT1
    }));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleOnClick = () => {
    // 저장 구현
    Swal.fire({
      title: '저장 하시겠습니까?',
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '저장',
      confirmButtonColor : '#1D79E7',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put('/api/Main/HeaderBar/setUserFav',{
            right : right,
        },
        {
          headers : {
            x_auth : sessionStorage.getItem("token")
          },
        }).then((res) => {
          Swal.fire({
            icon: 'success',
            title: '저장이 완료되었습니다.',
            confirmButtonColor : '#1D79E7',
            confirmButtonText: '확인'
          }).then(()=>{
            setOpen(false);
            setUserMenu(right);
          })
        }).catch((err) => {
          common.apiVerify(err);
        })
      }
    })
  }

  const customList = (title, items) => (
    
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} 선택됨`}
      />
      <Divider />
      <List
        sx={{
          width: 240,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        { items && items.map((value, index) => {
          const labelId = `transfer-list-all-item-${value.PROGRAM_SEQ}-label`;

          return (
            <ListItem
              key={index}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
              <ListItemText id={labelId} primary={`${value.PROGRAM_NAME}`} />
              
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <div>
    <img className='btn_set_favorite' onClick={handleOpen} alt={``}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <motion.div 
            className="modal_box"
            style={{
              left : isSider ? '210px' : '80px',
            }}
            animate={{
              left: isSider ? '210px' : '80px',
              transition: {
                duration: 0.5,
              },
            }}
          >
          <FaTimes onClick={handleClose} className="modal_close"/>
            <div id="modal-modal-title" className="modal_title">
              즐겨찾기설정
            </div>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item>{customList('선택', left)}</Grid>
              <Grid item>
                  <Grid container direction="column" alignItems="center">
                  <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                  >
                      &gt;
                  </Button>
                  <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                  >
                      &lt;
                  </Button>
                  </Grid>
              </Grid>
              <Grid item>{customList('선택', right)}</Grid>
              </Grid>
              
            </div>
            <div className="fav_btn">
            <Button variant="contained"  onClick={ handleOnClick }> 저장 </Button>
            </div>
          </motion.div>
      </Modal>
    </div>
  );
}
export default memo(FavoriteModal);