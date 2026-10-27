export const metadata = {
  title: "Terms of Service | BazarDor",
  description: "Terms of Service for BazarDor",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold text-slate-900">
          Terms of Service
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Last updated: October 27, 2026
        </p>

        <div className="mt-8 space-y-8 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              About BazarDor
            </h2>
            <p className="mt-2 leading-7">
              BazarDor is an educational web application designed to display
              information about essential product prices and market price
              changes in Bangladesh.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Acceptance of Terms
            </h2>
            <p className="mt-2 leading-7">
              By using BazarDor, you agree to use the application responsibly
              and in accordance with these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              User Accounts
            </h2>
            <p className="mt-2 leading-7">
              Some features may require an account. Users are responsible for
              maintaining the security of their account and for the activity
              performed through it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Authentication
            </h2>
            <p className="mt-2 leading-7">
              BazarDor may allow sign-in through email and password, Google,
              GitHub, or other supported authentication providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Market Information
            </h2>
            <p className="mt-2 leading-7">
              Product prices and market information are provided for
              informational and educational purposes. Actual prices may vary by
              location, seller, market conditions, and time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Acceptable Use
            </h2>
            <p className="mt-2 leading-7">
              Users must not attempt to misuse the application, interfere with
              its operation, gain unauthorized access, or use the service for
              unlawful activities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Availability
            </h2>
            <p className="mt-2 leading-7">
              We may update, modify, or temporarily discontinue parts of the
              application when necessary for maintenance, development, or
              technical reasons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Limitation of Liability
            </h2>
            <p className="mt-2 leading-7">
              BazarDor is provided for educational and informational purposes.
              We are not responsible for decisions made solely on the basis of
              displayed market information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Changes to These Terms
            </h2>
            <p className="mt-2 leading-7">
              These Terms of Service may be updated when application features
              or requirements change.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Contact
            </h2>
            <p className="mt-2 leading-7">
              For questions about these terms, please contact the BazarDor
              application administrator through the support information
              provided with the application.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}