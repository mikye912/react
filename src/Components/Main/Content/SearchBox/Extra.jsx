import Box from '@mui/material/Box';
import ExtraForm from './ExtraForm';

const Extra = ({ data, inputExRef, multiCheckRef }) => {
    return (
        <Box className="extra_search_box" display="grid" gridTemplateColumns="repeat(10, 1fr)">
            <Box className="extra_search_form" gridColumn="span 10">
                {data && data.map((data, index) => {
                    if (data.DEFAULT_YN == 'N') {
                        return (
                            <ExtraForm key={index} i={index} data={data} inputExRef={inputExRef} multiCheckRef={multiCheckRef} />
                        )
                    }
                })}
            </Box>
        </Box>
    );
};
export default Extra;