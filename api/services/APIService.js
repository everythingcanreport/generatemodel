var APIService = {};
APIService.Root = 'http://192.168.1.2:3000/api';

//module urgent care
APIService.UrgentCareRoute = '/urgent-care';
APIService.UrgentCareURL = APIService.Root + APIService.UrgentCareRoute;

APIService.UrgentRequestRoute = '/urgent-request';
APIService.UrgentRequestURL = APIService.Root + APIService.UrgentRequestRoute;

APIService.UrgentConfirmRoute = '/urgent-confirm';
APIService.UrgentConfirmURL = APIService.Root + APIService.UrgentConfirmRoute;

module.exports = APIService;
