export default function AboutDevelopment() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-sans">Application Development</h1>
          <p className="text-xl text-muted-foreground font-sans">A journey of innovation and dedication</p>
        </div>

        {/* Section 1: Database */}
        <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
          <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-6 text-center font-sans">
            Database Design
          </h2>
          <div className="space-y-4 text-center">
            <p className="text-lg text-card-foreground leading-relaxed font-sans">
              I first focused on designing the database in PostgreSQL, carefully defining its relationships and
              constraints.
            </p>
            <p className="text-lg text-card-foreground leading-relaxed font-sans">
              The database architecture ensures data integrity, optimal performance, and scalability for future growth.
            </p>
          </div>
        </div>

        {/* Section 2: Backend */}
        <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
          <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-6 text-center font-sans">
            Backend Development
          </h2>
          <div className="space-y-4 text-center">
            <p className="text-lg text-card-foreground leading-relaxed font-sans">
              I built the backend using Express, following best practices to ensure clean and maintainable code.
            </p>
            <p className="text-lg text-card-foreground leading-relaxed font-sans">
              Implemented JWT for authentication, used dotenv for environment variable management, and developed
              entirely in TypeScript for type safety and scalability.
            </p>
          </div>
        </div>

        {/* Section 3: Frontend */}
        <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
          <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-6 text-center font-sans">
            Frontend Development
          </h2>
          <div className="space-y-4 text-center">
            <p className="text-lg text-card-foreground leading-relaxed font-sans">
              The frontend was built following modern development best practices, using cutting-edge technologies such
              as Next.js, React, and Tailwind CSS.
            </p>
            <p className="text-lg text-card-foreground leading-relaxed font-sans">
              Integrated Auth.js for session management, Axios for API requests, SWR to keep data up-to-date, and
              various ShadCN components for UI consistency.
            </p>
          </div>
        </div>

        {/* Section 2: Developer Credit */}
        <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
          <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-6 text-center font-sans">
            Developer
          </h2>
          <div className="text-center space-y-4">
            <p className="text-lg text-card-foreground leading-relaxed font-sans">
              This application was developed with passion and dedication by a developer committed to excellence in software development.
            </p>
            <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
              <p className="text-2xl font-bold text-primary font-sans">Benjamin Marroquín</p>
              <p className="text-muted-foreground mt-2 font-sans">Developer Full Stack</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}