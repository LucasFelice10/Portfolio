export const base44 = {
  integrations: {
    Core: {
      SendEmail: async ({ to, subject, body }) => {
        console.log('Mock SendEmail called:', { to, subject, body })
        // Simula un pequeño delay
        await new Promise(resolve => setTimeout(resolve, 300))
        return { success: true }
      }
    }
  }
}
