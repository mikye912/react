import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';

const columns = [
    { field: 'ROWNUM', headerName: '순번', width: 70, align: "center", headerAlign: "center"},
    { field: 'TID', headerName: '단말기', width: 130, align: "center", headerAlign: "center" },
    { field: 'TOTCNT', headerName: '합계건수', type: 'number', width: 90, headerAlign: "center" },
    { field: 'TOTAMT', headerName: '합계금액', type: 'number', width: 130, headerAlign: "center" },
    { field: 'ACNT', headerName: '승인건수', type: 'number', width: 90, headerAlign: "center" },
    { field: 'AAMT', headerName: '승인금액', type: 'number', width: 130, headerAlign: "center" },
    { field: 'CCNT', headerName: '취소건수', type: 'number', width: 90, headerAlign: "center" },
    { field: 'CAMT', headerName: '취소금액', type: 'number', width: 130, headerAlign: "center" },
    { field: 'KB', headerName: '국민', type: 'number', width: 100, headerAlign: "center" },
    { field: 'NH', headerName: '농협', type: 'number', width: 100, headerAlign: "center" },
    { field: 'LO', headerName: '롯데', type: 'number', width: 100, headerAlign: "center" },
    { field: 'BC', headerName: '비씨', type: 'number', width: 100, headerAlign: "center" },
    { field: 'SS', headerName: '삼성', type: 'number', width: 100, headerAlign: "center" },
    { field: 'SH', headerName: '신한', type: 'number', width: 100, headerAlign: "center" },
    { field: 'HN', headerName: '하나', type: 'number', width: 100, headerAlign: "center" },
    { field: 'HD', headerName: '현대', type: 'number', width: 100, headerAlign: "center" },
    { field: 'RP', headerName: '지역화폐', type: 'number', width: 100, headerAlign: "center" },
    { field: 'AP', headerName: '알리페이', type: 'number', width: 100, headerAlign: "center" },
    { field: 'WP', headerName: '위쳇페이', type: 'number', width: 100, headerAlign: "center" },
    { field: 'ZP', headerName: '제로페이', type: 'number', width: 100, headerAlign: "center" },
    { field: 'CP', headerName: '카카오페이', type: 'number', width: 100, headerAlign: "center" },
];

const rows = [
    { id: 1, ROWNUM: 1, TID: '외래 단말기', TOTCNT: 18, TOTAMT: 3867500, ACNT: 17, AAMT: 3839100, CCNT: 1, CAMT: 28400, KB: 1777620, NH: 0, LO: 0, BC: 84720, SS: 1758790, SH: 221080, HN: 0, HD: 2178590, RP: 0, AP: 0, WP: 0, ZP: 0, CP: 0 },
    { id: 2, ROWNUM: 2, TID: '외래 무인단말기', TOTCNT: '18', TOTAMT: '3867500', ACNT: '17', AAMT: '3839100', CCNT: '1', CAMT: '28400', KB: '1777620', NH: '0', LO: '0', BC: '84720', SS: '1758790', SH: '221080', HN: '0', HD: '2178590', RP: '0', AP: '0', WP: '0', ZP: '0', CP: '0' },
    { id: 3, ROWNUM: 3, TID: '건진 단말기', TOTCNT: '18', TOTAMT: '3867500', ACNT: '17', AAMT: '3839100', CCNT: '1', CAMT: '28400', KB: '1777620', NH: '0', LO: '0', BC: '84720', SS: '1758790', SH: '221080', HN: '0', HD: '2178590', RP: '0', AP: '0', WP: '0', ZP: '0', CP: '0' },
];

/*테이블 ROW마다 배경색 다르게*/
const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
      },
    },
  },
}));

const DataTable = () => {
    return (
        <div style={{ height: 200, width: '100%' }}>
            <StripedDataGrid
                rows={rows}
                columns={columns}
                hideFooter
                headerHeight={40}
                rowHeight={40}
                sx={{
                    font: 'normal normal normal 14px/16px Pretendard',            
                    '& 	.MuiDataGrid-columnHeaderTitle': {
                        font: 'normal normal 600 14px Pretendard',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        background: '#EAEBEF 0% 0% no-repeat',
                    },
                    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                        borderRight: '1px solid #D2D2D2',
                    },
                    '&:hover, &.Mui-hovered': {
                        backgroundColor: '#DAEFFD 0% 0% no-repeat',
                    },
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even'
                }
            />
        </div>
    );
}

export default DataTable;