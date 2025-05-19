import 'dotenv/config'
import { env } from './validators/env'
import app from './app';

const PORT = env.PORT ?? 8000

app.listen(PORT, () => {
    console.log(`server running on ${env.BASEURL}:${PORT}`)
})

// 