import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Switch from '@mui/material/Switch';
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import useFetch from 'Common/axios';
import common from 'Common/common';
import Swal from 'sweetalert2';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  width: '280px',
  textAlign: 'center',

  // 드래그 할 때 리스트의 배경색 변경
  background: isDragging ? "#D2D2D2" : "#FFFFFF",
  border: '1px solid #EEF0F1',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#D2D2D2" : "#FFFFFF",
  color: 'black',
  border: '1px solid #EEF0F1',
});

const queryAttr = "data-rbd-drag-handle-draggable-id";

const ColumnModify = ({ column, page, setColumnlist, closePortal }) => {
  // react-beautiful-dnd development 경고 사용 안함
  window['__react-beautiful-dnd-disable-dev-warnings'] = true;
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [progress, fetchApi] = useFetch();
  const [items, setItems] = useState(column);
  
  const changeHandler = (checked, name) => {
    const findIndex = items.findIndex(element => element.headerName == name);
    let columnList = [...items];
    
    if (findIndex != -1) {
      if (checked) {
        columnList[findIndex] = { ...columnList[findIndex], visiable: "Y" };
      } else { 
        columnList[findIndex] = { ...columnList[findIndex], visiable: "N" };
      }
    }
    setItems(columnList);
  };

  //드래그 완료
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    setPlaceholderProps({})
    setItems(items => reorder(items, result.source.index, result.destination.index));
  };

  // 리스트 드래그할때
  const onDragUpdate = update => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
      .slice(0, destinationIndex)
      .reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
    });
  };

  const colnmnOrderSave = () => {
    Swal.fire({
      title: '저장 하시겠습니까?',
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '저장',
      confirmButtonColor: '#1D79E7',
      width: '400px'
    }).then((rst) => {
      if (rst.isConfirmed) {
        fetchApi.put('/api/users/contents/0201/detail', {
          PAGE: page,
          CATEGORY: 'DETAIL',
          ITEMS: items,
        }, {}).then(() => {
          Swal.fire({
            icon: 'success',
            title: '저장이 완료되었습니다.',
            confirmButtonColor: '#1D79E7',
            confirmButtonText: '확인'
          }).then(() => {
            closePortal()
            setColumnlist(items)
          })
        }).catch((err) => {
          common.apiVerify(err);
        })
      }
    })
  }

  return (
    <>
      <div className="modal_contentbox" style={{ position: 'relative' }}>
        {progress === false ? <CircularIndeterminate /> : null}
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items && items.map((column, index) => (
                  <Draggable key={column.sort} draggableId={column.headerName} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {column.headerName}
                        <div className="switch_case">
                          <Switch
                            name={column.headerName}
                            checked={column.visiable==='Y' ? true : false}
                            onChange={e => {
                              changeHandler(e.currentTarget.checked, e.currentTarget.name);
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {/* <CustomPlaceholder snapshot={snapshot} /> */}
                <div style={{
                  position: "absolute",
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth
                }} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="modal_content_footer">
        <button variant="contained" className="modal_content_button" onClick={colnmnOrderSave}> 저장 </button>
      </div>
    </>
  )
};

export default ColumnModify;
