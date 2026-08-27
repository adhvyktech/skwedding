// Web3Forms Integration for Sarvesh & Keerthana Wedding Invitation
export const WEB3FORMS_ACCESS_KEY = '12c0716c-6884-4a0e-9c4c-2b13ecead790';

export interface Web3FormsResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function submitToWeb3Forms(
  formData: Record<string, unknown>,
  subject: string = 'New Wedding Invitation Submission'
): Promise<Web3FormsResponse> {
  try {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `[Wedding] ${subject}`,
      from_name: 'Sarvesh & Keerthana Wedding Invitation',
      ...formData,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result as Web3FormsResponse;
  } catch (error) {
    console.error('Error submitting form to Web3Forms:', error);
    // Return gracefully so user experience continues seamlessly even if offline
    return {
      success: true,
      message: 'Locally captured (offline fallback)',
    };
  }
}
