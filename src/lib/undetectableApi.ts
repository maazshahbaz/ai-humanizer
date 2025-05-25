// API endpoints and credentials
declare global {
  interface ImportMeta {
    env: {
      VITE_UNDETECTABLE_API_KEY: string;
      VITE_UNDETECTABLE_USER_ID: string;
    };
  }
}

const API_KEY = import.meta.env.VITE_UNDETECTABLE_API_KEY;
const USER_ID = import.meta.env.VITE_UNDETECTABLE_USER_ID;

// Debug info
console.log('API Key available:', !!API_KEY);
console.log('User ID available:', !!USER_ID);

// Official Undetectable.ai API endpoints
const SUBMIT_ENDPOINT = 'https://api.undetectable.ai/v2/documents';
const RETRIEVE_ENDPOINT = 'https://api.undetectable.ai/v2/documents';

// Types
export type ReadabilityLevel = 'Elementary' | 'Middle School' | 'High School' | 'University' | 'Graduate';
export type ContentPurpose = 'General Writing' | 'Essay' | 'Email' | 'Creative Writing' | 'Business';
export type HumanizeStrength = 'More Human' | 'Balanced' | 'More Original';

interface SubmitDocumentParams {
  content: string;
  readability?: ReadabilityLevel;
  purpose?: ContentPurpose;
  strength?: HumanizeStrength;
  model?: string;
}

interface SubmitDocumentResponse {
  status: string;
  id: string;
}

// Document retrieval params type
type DocumentId = string;

interface RetrieveDocumentResponse {
  id: string;
  output: string;
  input: string;
  readability: string;
  createdDate: string;
  purpose: string;
}

interface HumanizeOptions {
  readability?: ReadabilityLevel;
  purpose?: ContentPurpose;
  strength?: HumanizeStrength;
  model?: string;
  pollingInterval?: number;
  maxRetries?: number;
}

// Error handling
class UndetectableApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UndetectableApiError';
  }
}

/**
 * Submits text to be humanized by Undetectable.ai
 * @param params Parameters for humanization
 * @returns A promise with the document ID
 */
export const submitDocument = async (params: SubmitDocumentParams): Promise<string> => {
  try {
    if (!API_KEY) {
      throw new UndetectableApiError('API key is missing');
    }

    if (params.content.length < 50) {
      throw new UndetectableApiError('Text must be at least 50 characters long');
    }

    console.log('Submitting document to Undetectable.ai...');
    
    // For demo/development purposes only, simulate successful API call
    // This will allow the application to work without an active API key
    // Remove this in production and uncomment the real API call below
    console.log('Using simulated API response for demo purposes');
    return `sim-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    /*
    const response = await fetch(SUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: params.content,
        readability: params.readability || 'High School',
        purpose: params.purpose || 'General Writing',
        strength: params.strength || 'More Human',
        model: params.model || 'v11',
      }),
    });
    */

    /* Commented out to prevent errors with the commented code above
    if (!response.ok) {
      if (response.status === 400) {
        throw new UndetectableApiError('Insufficient credits');
      }
      throw new UndetectableApiError(`API request failed with status: ${response.status}`);
    }

    const data: SubmitDocumentResponse = await response.json();
    return data.id;
    */
  } catch (error) {
    if (error instanceof UndetectableApiError) {
      throw error;
    }
    throw new UndetectableApiError(`Failed to submit document: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Retrieves a humanized document from Undetectable.ai
 * @param documentId The ID of the document to retrieve
 * @returns A promise with the humanized text
 */
export const retrieveDocument = async (documentId: DocumentId): Promise<string> => {
  try {
    if (!API_KEY) {
      throw new UndetectableApiError('API key is missing');
    }

    if (!documentId) {
      throw new UndetectableApiError('Document ID is required');
    }

    console.log('Retrieving document from Undetectable.ai:', documentId);
    
    // For demo/development purposes only, simulate successful API response
    // This will allow the application to work without an active API key
    // Remove this in production and uncomment the real API call below
    console.log('Using simulated API response for retrieveDocument');
    
    // For demo purposes, return results immediately without simulating processing delay
    // In a real implementation, the API would likely have a processing state
    
    // Generate a humanized version of the text by adding some filler content
    return `This is a humanized version of the text that would normally come from the Undetectable.ai API. 

The AI has rewritten the content to make it more human-like and less detectable by AI content detectors. 

For a real implementation, you would need valid API credentials from Undetectable.ai.`;
    
    /*
    const response = await fetch(`${RETRIEVE_ENDPOINT}/${documentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to retrieve document');
    }

    const data = await response.json();
  
    if (data.error) {
      throw new Error(data.error);
    }
  
    if (data.status === 'processing') {
      return 'processing';
    }
  
    return data.output || '';
    */
  } catch (error) {
    if (error instanceof UndetectableApiError) {
      throw error;
    }
    throw new UndetectableApiError(`Failed to retrieve document: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Humanizes text using Undetectable.ai API with polling for completion
 * @param content Text to humanize
 * @param options Additional options for humanization
 * @returns A promise with the humanized text
 */
export const humanizeText = async (content: string, options: HumanizeOptions = {}): Promise<string> => {
  try {
    // Submit the document for processing
    const documentId = await submitDocument({
      content,
      readability: options.readability,
      purpose: options.purpose,
      strength: options.strength,
      model: options.model,
    });

    // Set up polling mechanism to check for results
    const pollingInterval = options.pollingInterval || 500; // Default: 0.5 seconds for demo
    const maxRetries = options.maxRetries || 5; // Default: 5 retries (2.5 seconds with 500ms interval)
    
    let retries = 0;
    let result = '';
    
    // For the simulation to work properly, we need to keep track of the document ID
    let currentDocId = documentId;
    
    while (retries < maxRetries) {
      // Wait before checking (first time too to give API time to process)
      await new Promise(resolve => setTimeout(resolve, pollingInterval));
      
      // For simulation - pass the checked flag after first attempt
      if (retries > 0) {
        currentDocId = `${documentId}_checked`;
      }
      
      result = await retrieveDocument(currentDocId);
      
      if (result === 'processing') {
        retries++;
        continue;
      } else {
        break; // If we got actual content, exit the loop
      }
    }
    
    if (retries >= maxRetries) {
      throw new Error('Maximum polling attempts reached. Document processing is taking too long.');
    }
    
    return result;
  } catch (error) {
    console.error('Error humanizing text:', error);
    throw error;
  }
};
