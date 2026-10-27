export const metadata = {
  title: "Privacy Policy | BazarDor",
  description: "Privacy Policy for BazarDor",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold text-slate-900">
          Privacy Policy
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
              BazarDor is an educational web application that helps users view
              information about essential product prices and market price
              changes in Bangladesh.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Information We Collect
            </h2>
            <p className="mt-2 leading-7">
              When you create an account or sign in using Google, GitHub, or
              email and password, we may receive basic account information such
              as your name, email address, profile image, and authentication
              information required to manage your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              How We Use Information
            </h2>
            <p className="mt-2 leading-7">
              We use account information only to provide authentication,
              maintain user sessions, display profile information, and provide
              access to protected features of the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Third-Party Authentication
            </h2>
            <p className="mt-2 leading-7">
              BazarDor may use third-party authentication providers such as
              Google and GitHub. These providers process information according
              to their own privacy policies and terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Data Storage
            </h2>
            <p className="mt-2 leading-7">
              Authentication-related account information may be stored securely
              in the application database for the purpose of managing user
              accounts and sessions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Data Sharing
            </h2>
            <p className="mt-2 leading-7">
              We do not sell or rent personal information. Information is only
              processed as necessary to operate the application and its
              authentication features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Security
            </h2>
            <p className="mt-2 leading-7">
              Reasonable technical measures are used to protect account and
              authentication information. However, no internet-based service
              can guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Changes to This Policy
            </h2>
            <p className="mt-2 leading-7">
              This Privacy Policy may be updated when the application or its
              authentication features change.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              Contact
            </h2>
            <p className="mt-2 leading-7">
              For privacy-related questions, please contact the BazarDor
              application administrator through the support information
              provided with the application.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}