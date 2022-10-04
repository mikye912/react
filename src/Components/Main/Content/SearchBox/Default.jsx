import Box from '@mui/material/Box';
import DefaultForm from './DefaultForm';

const Default = ({ data, inputRef, inputExRef, multiCheckRef, span }) => {
    return (
        <Box className="search_form" gridColumn={span}>
            {data && data.map((data, index) => {
                if (data.DEFAULT_YN == 'Y') {
                    return (
                        <DefaultForm key={index} i={index} data={data} inputRef={inputRef} inputExRef={inputExRef} multiCheckRef={multiCheckRef} />
                    )
                }
            })}
        </Box>
    );
};
export default Default;