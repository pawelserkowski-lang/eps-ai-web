import pino from 'pino';

// Definicja poziomów logowania z env lub domyślnie 'info'
const logLevel = process.env.LOG_LEVEL || 'info';

// Konfiguracja "transportu" (czyli jak logi są wypluwane)
// W dev używamy 'pino-pretty' dla czytelności.
// W prod używamy domyślnego (szybkiego) formatu JSON.
const transport = process.env.NODE_ENV === 'development' 
  ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname', // W dev te dane tylko śmiecą
        translateTime: 'SYS:standard', // Czytelna data i czas
      }
    }
  : undefined;

export const logger = pino({
  level: logLevel,
  transport,
  // Security Agent: "To jest najważniejsza część!"
  // Automatycznie ukrywa wartości dla tych kluczy, gdziekolwiek się pojawią w obiekcie
  redact: {
    paths: [
      'password',
      'token',
      'accessToken',
      'refreshToken',
      'authorization',
      'req.headers.authorization',
      'user.password',
      'billing.creditCard'
    ],
    remove: true // Całkowicie usuwa pole (lub ustaw false by zamienić na "[Redacted]")
  },
  // Dodatkowe meta-dane bazowe dla każdego logu
  base: {
    env: process.env.NODE_ENV,
  },
});

// Pomocnicze funkcje dla spójności (opcjonalne, ale zalecane przez Architekta)

export const logAction = (action: string, meta: Record<string, any> = {}) => {
  logger.info({ ...meta, action }, `Action performed: ${action}`);
};

export const logError = (error: unknown, context: string, meta: Record<string, any> = {}) => {
  const err = error instanceof Error ? { message: error.message, stack: error.stack, name: error.name } : { message: String(error) };
  logger.error({ ...meta, err, context }, `Error in ${context}: ${err.message}`);
};