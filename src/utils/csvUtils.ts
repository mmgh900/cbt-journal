import Papa from 'papaparse';
import { CBTRecord, Emotion, useCBTStore } from '../store/cbtStore';

// Helper function to serialize emotions for CSV
const serializeEmotions = (emotions: Emotion[]): string => {
  return emotions.map(e => `${e.id}:${e.name}:${e.icon}`).join('|');
};

// Helper function to deserialize emotions from CSV
const deserializeEmotions = (emotionsStr: string): Emotion[] => {
  if (!emotionsStr) return [];

  return emotionsStr.split('|').map(emotionStr => {
    const [id, name, icon] = emotionStr.split(':');
    return { id, name, icon };
  });
};

// Export records to CSV
export const exportToCSV = (records: CBTRecord[]): void => {
  const data = records.map(record => ({
    id: record.id,
    time: record.time,
    situation: record.situation,
    thought: record.thought,
    emotions: serializeEmotions(record.emotions),
    action: record.action
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `cbt-journal-export-${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Import records from CSV
export const importFromCSV = (file: File): Promise<CBTRecord[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const records = results.data.map((row: any) => ({
            id: row.id || crypto.randomUUID(),
            time: row.time,
            situation: row.situation,
            thought: row.thought,
            emotions: deserializeEmotions(row.emotions),
            action: row.action
          }));

          resolve(records as CBTRecord[]);
        } catch (error) {
          reject(new Error('Failed to parse CSV file'));
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Import records and add them to the store
export const importAndAddRecords = async (file: File): Promise<void> => {
  try {
    const records = await importFromCSV(file);
    records.forEach(record => {
      useCBTStore.getState().addRecord({
        time: record.time,
        situation: record.situation,
        thought: record.thought,
        emotions: record.emotions,
        action: record.action
      });
    });
  } catch (error) {
    console.error('Failed to import records:', error);
    throw error;
  }
};
