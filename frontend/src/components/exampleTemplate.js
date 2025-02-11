export const exampleTemplate = {
  word: "einrichten",
  part_of_speech: "verb",
  meanings: [
    {
      meaning: "to furnish, equip (a room, an apartment, an office, etc.)",
      translations: {
        english: ["to furnish", "to equip", "to set up"],
        russian: ["обставлять", "оборудовать", "устраивать"]
      },
      synonyms: ["möblieren", "ausstatten", "gestalten"],
      antonyms: ["abräumen", "entleeren"],
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
      synonyms: ["organisieren", "planen", "strukturieren"],
      antonyms: ["zerstören", "verwirren"],
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
