import Box from '@mui/material/Box';
import DefaultForm from './DefaultForm';

const Default = ({ data, inputRef }) => {
    return (
        <Box className="search_form" gridColumn="span 8">
            {data && data.map((data, index) => {
                if (data.DEFAULT_YN == 'Y') {
                    return (
                        <DefaultForm key={index} index={index} data={data} inputRef={inputRef} />
                    )
                }
            })}
        </Box>
    );
};
export default Default;