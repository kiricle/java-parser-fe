import {
    Box,
    Button,
    Dialog,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useInput } from '../../hooks/useInput';
import styles from './SearchForm.module.scss';
import { useState } from 'react';

export const SearchForm = ({
    close,
    isOpen,
    setVacancies,
}: {
    close: () => void;
    isOpen: boolean;
    setVacancies: (newVacancies: Vacancy[]) => void;
}) => {
    const { value: name, onChange: onNameChange } = useInput();
    const { value: city, onChange: onCityChange } = useInput();
    const [exp, setExp] = useState('');

    return (
        <Dialog
            open={isOpen}
            onClose={close}
        >
            <form className={styles.searchForm}>
                <h1>Шукати вакансії</h1>
                <Box
                    gap={5}
                    flexDirection={'column'}
                    display={'flex'}
                >
                    <TextField
                        onChange={onNameChange}
                        label={'Шукати вакансію'}
                        variant="outlined"
                    />
                    <TextField
                        onChange={onCityChange}
                        label={'Місто'}
                        variant="outlined"
                    />
                    <FormControl>
                        <InputLabel>Досвід</InputLabel>
                        <Select
                            defaultValue={exp}
                            label="Досвід"
                            onChange={(e) => setExp(e.target.value)}
                        >
                            <MenuItem value={'0-1'}>Менше ніж рік</MenuItem>
                            <MenuItem value={'1-3'}>1-3</MenuItem>
                            <MenuItem value={'3-5'}>3-5</MenuItem>
                            <MenuItem value={'5plus'}>5+</MenuItem>
                            <MenuItem value={''}>Будь-який</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        onClick={async () => {
                            const url = new URL(
                                'http://localhost:8080/vacancy'
                            );
                            url.searchParams.set('search', name);
                            url.searchParams.set('city', city);
                            url.searchParams.set('exp', exp);

                            const response = await fetch(url.toString());

                            if (!response.ok) alert('Something went wrong');

                            const result = await response.json();
                            setVacancies(result);

                            close();
                        }}
                    >
                        Шукати
                    </Button>
                </Box>
            </form>
        </Dialog>
    );
};
