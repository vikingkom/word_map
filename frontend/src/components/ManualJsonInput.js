import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SaveIcon from '@mui/icons-material/Save';

const ManualJsonInput = ({ onSubmit, setLoading }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const validateAndSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError('');
      setLoading(true);
      await onSubmit(parsedJson);
    } catch (error) {
      setError('Invalid JSON format. Please check your input.');
    } finally {
      setLoading(false);
    }
  };

  const emptyTemplate = {
    word: "<input_word>",
    part_of_speech: "<noun/verb/adjective/etc.>",
    meanings: [
      {
        meaning: "<meaning_description>",
        translations: {
          english: ["<translation1>", "<translation2>"],
          russian: ["<translation1>", "<translation2>"]
        },
        best_language_for_memorization: {
          language: "<English/Russian>",
          reason: "<meaning similarity / stems / phonetics / linguistic nuances / common phrases>",
          hint: "<mnemonic or trick to remember the word>"
        },
        usage_frequency: "<low/medium/high>",
        comprehension_level: "<A1/A2/B1/B2/C1/C2>",
        examples: {
          illustrative: [
            {
              de: "<German sentence>",
              en: "<English translation>",
              ru: "<Russian translation>"
            }
          ],
          real_world: [
            {
              de: "<German sentence>",
              en: "<English translation>",
              ru: "<Russian translation>"
            }
          ]
        },
        prepositions: {
          "<preposition1>": [
            {
              de: "<Example>",
              en: "<English translation>",
              ru: "<Russian translation>"
            }
          ]
        },
        synonyms: ["<synonym1>", "<synonym2>"],
        antonyms: ["<antonym1>", "<antonym2>"],
        idioms_and_common_phrases: [
          {
            phrase: "<German idiom or phrase>",
            literal_translation: "<Literal translation in English>",
            meaning: "<Actual meaning/explanation>",
            examples: [
              {
                de: "<German sentence>",
                en: "<English translation>",
                ru: "<Russian translation>"
              }
            ]
          }
        ]
      }
    ],
    grammar: {
      noun: {
        gender: "<der/die/das>",
        plural: "<plural_form>",
        cases: {
          nominative: "<form>",
          accusative: "<form>",
          dative: "<form>",
          genitive: "<form>"
        }
      },
      verb: {
        infinitive: "<infinitive_form>",
        conjugation: {
          present: "<conjugated_form>",
          past: "<past_form>",
          perfect: "<perfect_form>",
          subjunctive: "<subjunctive_form>",
          imperative: "<imperative_form>"
        },
        all_forms: {
          ich: "<form>",
          du: "<form>",
          "er/sie/es": "<form>",
          wir: "<form>",
          ihr: "<form>",
          "sie/Sie": "<form>"
        },
        grammar_properties: {
          type: "<transitive/intransitive/reflexive>",
          required_case: "<accusative/dative/genitive>",
          common_prepositions: ["<mit>", "<auf>", "<zu>"],
          auxiliary_verb: "<haben/sein>",
          separable_prefix: "<prefix_if_applicable>",
          declension: {
            present_participle: "<form>",
            past_participle: "<form>"
          }
        },
        related_phrases: [
          {
            phrase: "<phrase_form (e.g., sich einrichten)>",
            meaning: "<meaning_description>",
            translations: {
              english: ["<translation1>", "<translation2>"],
              russian: ["<translation1>", "<translation2>"]
            },
            best_language_for_memorization: {
              language: "<English/Russian>",
              reason: "<meaning similarity / stems / phonetics / linguistic nuances / common phrases>",
              hint: "<mnemonic or trick to remember the phrase>"
            },
            usage_frequency: "<low/medium/high>",
            comprehension_level: "<A1/A2/B1/B2/C1/C2>",
            examples: {
              illustrative: [
                {
                  de: "<German sentence>",
                  en: "<English translation>",
                  ru: "<Russian translation>"
                }
              ],
              real_world: [
                {
                  de: "<German sentence>",
                  en: "<English translation>",
                  ru: "<Russian translation>"
                }
              ]
            },
            prepositions: {
              "<preposition1>": [
                {
                  de: "<Example>",
                  en: "<English translation>",
                  ru: "<Russian translation>"
                }
              ]
            },
            synonyms: ["<synonym1>", "<synonym2>"],
            antonyms: ["<antonym1>", "<antonym2>"],
            idioms_and_common_phrases: [
              {
                phrase: "<German idiom or phrase>",
                literal_translation: "<Literal translation in English>",
                meaning: "<Actual meaning/explanation>",
                examples: [
                  {
                    de: "<German sentence>",
                    en: "<English translation>",
                    ru: "<Russian translation>"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  };

  const exampleTemplate = {
    word: "einrichten",
    part_of_speech: "verb",
    meanings: [
      {
        meaning: "to furnish, equip (a room, an apartment, an office, etc.)",
        translations: {
          english: ["to furnish", "to equip", "to set up"],
          russian: ["обставлять", "оборудовать", "устраивать"]
        },
        best_language_for_memorization: {
          language: "English",
          reason: "The German 'einrichten' closely aligns with 'to furnish' and 'to equip' in meaning and usage.",
          hint: "Think of 'ein-' (in) and 'richten' (to arrange, direct). 'Einrichten' means arranging things inside."
        },
        usage_frequency: "high",
        comprehension_level: "A2",
        examples: {
          illustrative: [
            {
              de: "Wir haben die neue Wohnung schön eingerichtet.",
              en: "We have nicely furnished the new apartment.",
              ru: "Мы красиво обставили новую квартиру."
            }
          ],
          real_world: [
            {
              de: "Das Büro wurde modern eingerichtet, um eine produktive Atmosphäre zu schaffen.",
              en: "The office was furnished in a modern style to create a productive atmosphere.",
              ru: "Офис был оборудован в современном стиле, чтобы создать продуктивную атмосферу."
            }
          ]
        },
        prepositions: {
          mit: [
            {
              de: "Er hat das Wohnzimmer mit neuen Möbeln eingerichtet.",
              en: "He furnished the living room with new furniture.",
              ru: "Он обставил гостиную новой мебелью."
            }
          ]
        },
        synonyms: ["möblieren", "ausstatten", "gestalten"],
        antonyms: ["abräumen", "entleeren"],
        idioms_and_common_phrases: [
          {
            phrase: "sich (etwas) einrichten",
            literal_translation: "to arrange something for oneself",
            meaning: "to organize something to one's needs",
            examples: [
              {
                de: "Er hat sich sein Büro gemütlich eingerichtet.",
                en: "He has made his office cozy for himself.",
                ru: "Он устроил свой офис уютно для себя."
              }
            ]
          }
        ]
      },
      {
        meaning: "to arrange, set up (a system, a schedule, etc.)",
        translations: {
          english: ["to arrange", "to set up", "to organize"],
          russian: ["организовать", "настроить", "устроить"]
        },
        best_language_for_memorization: {
          language: "Russian",
          reason: "'Einrichten' in this sense is similar to 'устроить' or 'организовать', both commonly used in Russian.",
          hint: "Think of 'richten' as 'to direct' or 'to arrange'."
        },
        usage_frequency: "medium",
        comprehension_level: "B1",
        examples: {
          illustrative: [
            {
              de: "Wir müssen die Arbeitszeiten besser einrichten.",
              en: "We need to better arrange the working hours.",
              ru: "Нам нужно лучше организовать рабочие часы."
            }
          ],
          real_world: [
            {
              de: "Die Firma hat ein flexibles Home-Office-System eingerichtet.",
              en: "The company has set up a flexible home office system.",
              ru: "Компания организовала гибкую систему удаленной работы."
            }
          ]
        },
        prepositions: {
          für: [
            {
              de: "Ich richte die Software für dich ein.",
              en: "I am setting up the software for you.",
              ru: "Я настраиваю программное обеспечение для тебя."
            }
          ]
        },
        synonyms: ["organisieren", "planen", "strukturieren"],
        antonyms: ["zerstören", "verwirren"],
        idioms_and_common_phrases: [
          {
            phrase: "sich darauf einrichten",
            literal_translation: "to set oneself up for it",
            meaning: "to prepare for something",
            examples: [
              {
                de: "Er hat sich darauf eingerichtet, lange zu warten.",
                en: "He has prepared himself for a long wait.",
                ru: "Он настроился на долгое ожидание."
              }
            ]
          }
        ]
      }
    ],
    grammar: {
      verb: {
        infinitive: "einrichten",
        conjugation: {
          present: "richtet ein",
          past: "richtete ein",
          perfect: "hat eingerichtet",
          subjunctive: "richtete ein",
          imperative: "richte ein"
        },
        all_forms: {
          ich: "richte ein",
          du: "richtest ein",
          "er/sie/es": "richtet ein",
          wir: "richten ein",
          ihr: "richtet ein",
          "sie/Sie": "richten ein"
        },
        grammar_properties: {
          type: "transitive",
          required_case: "accusative",
          common_prepositions: ["mit", "für"],
          auxiliary_verb: "haben",
          separable_prefix: "ein",
          declension: {
            present_participle: "einrichtend",
            past_participle: "eingerichtet"
          }
        },
        related_phrases: [
          {
            phrase: "sich einrichten",
            meaning: "to get comfortable, to settle in",
            translations: {
              english: ["to settle in", "to get comfortable"],
              russian: ["обустраиваться", "устраиваться"]
            },
            best_language_for_memorization: {
              language: "English",
              reason: "'To settle in' is a common and intuitive equivalent in English.",
              hint: "Think of arranging things (einrichten) but for yourself."
            },
            usage_frequency: "medium",
            comprehension_level: "B1",
            examples: {
              illustrative: [
                {
                  de: "Ich habe mich schnell in der neuen Stadt eingerichtet.",
                  en: "I have settled in quickly in the new city.",
                  ru: "Я быстро обустроился в новом городе."
                }
              ],
              real_world: [
                {
                  de: "Nachdem sie umgezogen sind, haben sie sich in ihrer neuen Wohnung eingerichtet.",
                  en: "After moving, they settled in their new apartment.",
                  ru: "После переезда они обустроились в своей новой квартире."
                }
              ]
            },
            prepositions: {
              in: [
                {
                  de: "Er hat sich gut in der neuen Umgebung eingerichtet.",
                  en: "He has settled in well in the new environment.",
                  ru: "Он хорошо обустроился в новой среде."
                }
              ]
            },
            synonyms: ["sich niederlassen", "sich eingewöhnen"],
            antonyms: ["umziehen", "verlassen"],
            idioms_and_common_phrases: []
          }
        ]
      }
    }
  };

  const handlePasteSchema = () => {
    setJsonInput(JSON.stringify(emptyTemplate, null, 2));
  };

  const handlePasteExample = () => {
    setJsonInput(JSON.stringify(exampleTemplate, null, 2));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          variant="outlined"
          onClick={handlePasteSchema}
          startIcon={<ContentPasteIcon />}
        >
          Paste Empty Template
        </Button>
        <Button
          variant="outlined"
          onClick={handlePasteExample}
          startIcon={<ContentPasteIcon />}
        >
          Paste Example
        </Button>
      </Box>
      <TextField
        fullWidth
        multiline
        rows={20}
        label="Enter JSON"
        variant="outlined"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ fontFamily: 'monospace' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={validateAndSubmit}
          startIcon={<SaveIcon />}
          sx={{ minWidth: '120px' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ManualJsonInput;
