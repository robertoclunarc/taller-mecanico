// src/App.tsx
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpIcon from '@mui/icons-material/Help';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Chart from 'chart.js/auto';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const sections = ['dashboard', 'newService', 'servicesList', 'calendar', 'analytics', 'timeline'] as const;
type Section = typeof sections[number];

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');
  const [history, setHistory] = useState<Section[]>(['dashboard']);

  const pageTitle = {
    dashboard: 'Tablero',
    newService: 'Nuevo servicio',
    servicesList: 'Servicios',
    calendar: 'Citas',
    analytics: 'Punto de equilibrio',
    timeline: 'Servicios archivado'
  }[currentSection];

  const showSection = (section: Section) => {
    setCurrentSection(section);
    setHistory([...history, section]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prev = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentSection(prev);
    }
  };

  useEffect(() => {
    let monthlyChartInstance: Chart | undefined;
    let surveyChartInstance: Chart | undefined;
    let equilibriumChartInstance: Chart | undefined;

    if (currentSection === 'dashboard') {
      const monthlyCtx = document.getElementById('monthlyChart') as HTMLCanvasElement;
      const surveyCtx = document.getElementById('surveyChart') as HTMLCanvasElement;
      const equilibriumCtx = document.getElementById('equilibriumChart') as HTMLCanvasElement;

      if (monthlyCtx) {
        monthlyChartInstance = new Chart(monthlyCtx, {
          type: 'line',
          data: {
            labels: ['2022-06', '2022-07', '2022-08', '2022-09', '2022-10', '2022-11'],
            datasets: [{
              label: 'Clientes nuevos',
              data: [0, 2, 1, 1, 8, 2],
              borderColor: '#4f46e5',
              backgroundColor: '#4f46e5',
              tension: 0.4,
              pointRadius: 6
            }]
          },
          options: { responsive: true, plugins: { legend: { display: false } } }
        });
      }

      if (surveyCtx) {
        surveyChartInstance = new Chart(surveyCtx, {
          type: 'pie',
          data: {
            labels: ['Redes sociales', 'Medios', 'Recomendación', 'Otra'],
            datasets: [{
              data: [75, 15, 5, 5],
              backgroundColor: ['#22c55e', '#3b82f6', '#ef4444', '#eab308']
            }]
          },
          options: { responsive: true, plugins: { legend: { display: false } } }
        });
      }

      if (equilibriumCtx) {
        equilibriumChartInstance = new Chart(equilibriumCtx, {
          type: 'line',
          data: {
            labels: ['-68', '-18', '32', '82', '132', '182', '232', '282', '332'],
            datasets: [
              {
                label: 'Valor Horas vendidas',
                data: [-5000000, 0, 3000000, 6000000, 9000000, 12000000, 15000000, 18000000, 21000000],
                borderColor: '#3b82f6',
                backgroundColor: '#3b82f6',
                tension: 0.4,
                pointRadius: 4
              },
              {
                label: 'Costos por Horas',
                data: Array(9).fill(5000000),
                borderColor: '#4f46e5',
                backgroundColor: '#4f46e5',
                tension: 0.4,
                pointRadius: 4
              }
            ]
          },
          options: { responsive: true, plugins: { legend: { display: false } } }
        });
      }
    }

    return () => {
      monthlyChartInstance?.destroy();
      surveyChartInstance?.destroy();
      equilibriumChartInstance?.destroy();
    };
  }, [currentSection]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f3f4f6' }}>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={goBack} color="primary"><ArrowBackIcon /></IconButton>
            <Typography variant="h6">{pageTitle}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton><HelpIcon color="primary" /></IconButton>
            <IconButton><WhatsAppIcon color="primary" /></IconButton>
            <IconButton><WidgetsIcon color="primary" /></IconButton>
            <IconButton><NotificationsIcon color="primary" /></IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ position: 'sticky', top: 64, zIndex: 1000, bgcolor: '#ffffff', boxShadow: 1 }}>
        <Container maxWidth="md" sx={{ py: 1, display: 'flex', justifyContent: 'space-around' }}>
          <Button variant={currentSection === 'dashboard' ? 'contained' : 'text'} onClick={() => showSection('dashboard')}>Inicio</Button>
          <Button variant={currentSection === 'servicesList' ? 'contained' : 'text'} onClick={() => showSection('servicesList')}>Servicios</Button>
          <Button variant={currentSection === 'calendar' ? 'contained' : 'text'} onClick={() => showSection('calendar')}>Citas</Button>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {currentSection === 'dashboard' && (
          <Stack spacing={4}>
            <Button variant="contained" fullWidth onClick={() => showSection('newService')}>
              CREAR ORDEN DE SERVICIO
            </Button>

            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src="/publicidad01.png"
                alt="Publicidad"
                sx={{ width: '100%', maxHeight: 500, objectFit: 'cover', borderRadius: 2, boxShadow: 2 }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '99%',
                  bgcolor: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2
                }}
              >
                <Typography variant="h5" color="white" align="center">
                  ¡Bienvenido a nuestro taller!<br />Servicio confiable y garantizado
                </Typography>
              </Box>
            </Box>

            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Análisis de los últimos meses</Typography>
              <canvas id="monthlyChart" width={400} height={200}></canvas>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>¿Cómo conoció nuestra empresa?</Typography>
              <canvas id="surveyChart" width={200} height={200}></canvas>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Punto de equilibrio</Typography>
              <canvas id="equilibriumChart" width={400} height={200}></canvas>
            </Paper>
          </Stack>
        )}

        {currentSection === 'newService' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Nueva Orden de Servicio</Typography>
            <TextField label="¿Es Garantía?" select fullWidth>
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Sí">Sí</MenuItem>
            </TextField>
            <TextField label="¿Autoriza prueba de ruta?" select fullWidth>
              <MenuItem value="Sí">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
            <TextField label="Fecha y hora" type="datetime-local" fullWidth defaultValue="2022-11-30T23:30" InputLabelProps={{ shrink: true }} />
            <TextField label="Cliente" select fullWidth>
              <MenuItem value="Milena Diaz">Milena Diaz</MenuItem>
              <MenuItem value="ABBANZAR ZOMAC SAS">ABBANZAR ZOMAC SAS</MenuItem>
            </TextField>
            <TextField label="Vehículo" select fullWidth>
              <MenuItem value="Audi NEGRO, ER2-231">Audi NEGRO, ER2-231</MenuItem>
              <MenuItem value="Jeep negro, 1I2KFOD">Jeep negro, 1I2KFOD</MenuItem>
            </TextField>
            <TextField label="Asesor de repuestos" select fullWidth>
              <MenuItem value="">-SELECCIONE-</MenuItem>
            </TextField>
            <TextField label="Técnico responsable" select fullWidth>
              <MenuItem value="Técnico dos">Técnico dos</MenuItem>
              <MenuItem value="Yulian Basto">Yulian Basto</MenuItem>
              <MenuItem value="Técnico Tres">Técnico Tres</MenuItem>
            </TextField>
            <TextField label="Fallas manifestadas" multiline rows={3} placeholder="Describe cada falla por separado." fullWidth />
            <Button variant="contained">GUARDAR</Button>
          </Box>
        )}

        {currentSection === 'servicesList' && (
          <Box>
            <Typography variant="h5" gutterBottom>Servicios</Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography>Vehículo: Audi NEGRO, ER2-231</Typography>
              <Typography>Fallas Manifestadas: Falla ,</Typography>
              <Typography>Comentarios: hello</Typography>
              <Typography>Técnico Responsable: Tecnico dos</Typography>
              <Typography variant="caption" color="text.secondary">Orden de servicio editada, hace 3 días</Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography>Cliente: Milena Diaz</Typography>
              <Typography>Vehículo: Jeep negro, 1I2KFOD</Typography>
              <Typography>Fallas Manifestadas: no</Typography>
              <Typography>Comentarios: no</Typography>
              <Typography>Técnico Responsable: Yulian Basto</Typography>
              <Typography variant="caption" color="error">Pendiente de aprobación (WhatsApp), hace un mes</Typography>
            </Paper>
          </Box>
        )}

        {currentSection === 'calendar' && (
          <Box>
            <Typography variant="h5" gutterBottom>Citas</Typography>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={new Date()}
                    onChange={() => {}}
                    
                  />
                </LocalizationProvider>
                <Typography color="text.secondary" mt={2}>
                  No hay eventos para la fecha seleccionada
                </Typography>
              </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}