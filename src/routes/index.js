import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import TrainingRoutes from './TrainingRoutes';
import ReportsRoutes from './ReportsRoutes';
import NomineeFormRoutes from './NomineFormRoutes'
import ProgramListRoutes from './ProgramListRoute'
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, AuthenticationRoutes, TrainingRoutes, ReportsRoutes, ProgramListRoutes, NomineeFormRoutes]);
}
