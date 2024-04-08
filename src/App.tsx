import {
    Button,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useState } from 'react';
import './App.scss';
import { SearchForm } from './components/SearchForm/SearchForm';

function App() {
    const [open, setOpen] = useState(false);
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);

    return (
        <>
            <Button
                variant="outlined"
                onClick={() => setOpen(true)}
                style={{
                    marginTop: '20px',
                    width: 'fit-content',
                    marginInline: 'auto',
                }}
            >
                Шукати вакансії
            </Button>

            {vacancies.length > 0 && (
                <Button
                    variant="contained"
                    style={{ width: 'fit-content', marginInline: 'auto' }}
                    onClick={async () => {
                        const url = new URL('http://localhost:8080/export');

                        const response = await fetch(url.toString(), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(vacancies),
                        });

                        const contentDispositionHeader = response.headers.get(
                            'Content-Disposition'
                        );
                        const filename = contentDispositionHeader
                            ?.split(';')[1]
                            .split('=')[1];

                        const blob = await response.blob();
                        const fileURL = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = fileURL;
                        link.download = filename || 'vacancies.xlsx';
                        link.click();

                        URL.revokeObjectURL(fileURL);
                    }}
                >
                    Експортувати в Excel
                </Button>
            )}

            <SearchForm
                isOpen={open}
                close={() => setOpen(false)}
                setVacancies={setVacancies}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Вакансія</TableCell>
                            <TableCell>Локація</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Компанія</TableCell>
                            <TableCell>Посилання</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vacancies.length > 0 &&
                            vacancies.map(
                                ({
                                    company,
                                    date,
                                    location,
                                    name,
                                    reference,
                                }) => (
                                    <TableRow key={reference}>
                                        <TableCell>{name}</TableCell>
                                        <TableCell>{location}</TableCell>
                                        <TableCell>{date}</TableCell>
                                        <TableCell>{company}</TableCell>
                                        <TableCell>
                                            <Link
                                                href={reference}
                                                target="_blank"
                                            >
                                                {reference}
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default App;
