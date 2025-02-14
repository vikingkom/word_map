import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
  Button,
  Collapse,
  Tooltip
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SpeedIcon from '@mui/icons-material/Speed';
import SchoolIcon from '@mui/icons-material/School';
import LinkIcon from '@mui/icons-material/Link';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import GradeIcon from '@mui/icons-material/Grade';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import LanguageIcon from '@mui/icons-material/Language';
import FlagIcon from '@mui/icons-material/Flag';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PublicIcon from '@mui/icons-material/Public';
import CompareIcon from '@mui/icons-material/Compare';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { GB, RU, DE } from 'country-flag-icons/react/3x2';

const FlagComponent = ({ country, size = 20 }) => {
  const FlagIcon = {
    GB,
    RU,
    DE
  }[country];

  return FlagIcon ? (
    <Box 
      component={FlagIcon} 
      sx={{ 
        width: size, 
        height: 'auto',
        mr: 1,
        display: 'inline-block',
        verticalAlign: 'middle'
      }} 
    />
  ) : null;
};

const LanguageChip = ({ language, translations }) => {
  const getLanguageProps = (lang) => {
    switch (lang) {
      case 'en':
        return {
          icon: <FlagComponent country="GB" size={16} />,
          label: translations,
          color: 'primary'
        };
      case 'ru':
        return {
          icon: <FlagComponent country="RU" size={16} />,
          label: translations,
          color: 'secondary'
        };
      default:
        return {
          label: translations,
          color: 'default'
        };
    }
  };

  const props = getLanguageProps(language);

  return (
    <Tooltip title={translations}>
      <Chip
        {...props}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiChip-icon': {
            ml: 0.5
          }
        }}
      />
    </Tooltip>
  );
};

const LanguageChipNew = ({ language, translations }) => {
  const getLanguageProps = (lang) => {
    switch (lang) {
      case 'en':
        return {
          icon: <FlagComponent country="GB" size={16} />,
          label: translations,
          color: 'primary'
        };
      case 'ru':
        return {
          icon: <FlagComponent country="RU" size={16} />,
          label: translations,
          color: 'secondary'
        };
      default:
        return {
          label: translations,
          color: 'default'
        };
    }
  };

  const props = getLanguageProps(language);

  return (
    <Chip
      {...props}
      variant="outlined"
      size="small"
      sx={{
        '& .MuiChip-icon': {
          ml: 0.5
        }
      }}
    />
  );
};

const ExampleBox = ({ example }) => {
  if (!example) return null;

  // Handle both formats: {de, en, ru} and {german, english, russian}
  const germanText = example.german || example.de;
  const englishText = example.english || example.en;
  const russianText = example.russian || example.ru;

  if (!germanText) return null;

  return (
    <Box sx={{ mb: 1, pl: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* German example with bullet point */}
        <Typography component="div" sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ marginRight: '8px' }}>•</span>
          <Box>
            <Typography>{germanText}</Typography>
            {/* Translations with smaller font and indentation */}
            <Box sx={{ pl: 2 }}>
              {englishText && (
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <FlagComponent country="GB" size={16} />
                  {englishText}
                </Typography>
              )}
              {russianText && (
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <FlagComponent country="RU" size={16} />
                  {russianText}
                </Typography>
              )}
            </Box>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

const MinimalCard = ({ icon: Icon, title, children }) => (
  <Box sx={{ mb: 2 }}>
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      <Tooltip title={title}>
        <Icon color="primary" fontSize="small" />
      </Tooltip>
    </Box>
    {children}
  </Box>
);

const PrepositionSection = ({ prepositions }) => {
  if (!prepositions || !Array.isArray(prepositions)) {
    return null;
  }

  return (
    <MinimalCard icon={LinkIcon} title="Prepositions">
      <Box display="flex" flexDirection="column" gap={2}>
        {prepositions.map((prep, index) => (
          <Box key={index}>
            <Chip 
              label={`${prep.preposition} (${prep.case})`}
              size="small" 
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <Box pl={2}>
              {prep.examples?.map((ex, idx) => (
                <ExampleBox key={idx} example={ex} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </MinimalCard>
  );
};

const IdiomsSection = ({ idioms }) => {
  if (!idioms?.length) return null;

  return (
    <Box>
      {idioms.map((idiom, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            {idiom.phrase}
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {idiom.meaning}
            </Typography>
            {idiom.usage_notes && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                <em>Usage: {idiom.usage_notes}</em>
              </Typography>
            )}
            {idiom.example && (
              <Box sx={{ mt: 1 }}>
                <ExampleBox example={idiom.example} />
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const MemorizationHintSection = ({ best_language_for_memorization }) => {
  if (!best_language_for_memorization) return null;
  const { hint, language, reason } = best_language_for_memorization;

  return (
    <MinimalCard icon={EmojiObjectsIcon} title="Memorization Hint">
      <Box sx={{ pl: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FlagComponent country={language === 'English' ? 'GB' : language === 'Russian' ? 'RU' : 'DE'} />
          <Typography variant="subtitle2" color="primary" sx={{ ml: 1 }}>
            Best Language: {language}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 1 }}>{hint}</Typography>
        <Typography variant="body2" color="text.secondary">
          Why? {reason}
        </Typography>
      </Box>
    </MinimalCard>
  );
};

const SemanticNetworkSection = ({ synonyms, antonyms }) => {
  if (!synonyms?.length && !antonyms?.length) return null;

  return (
    <MinimalCard icon={CompareIcon} title="Semantic Network">
      {/* Synonyms */}
      {synonyms?.length > 0 && (
        <Box sx={{ mb: synonyms?.length > 0 ? 2 : 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TrendingUpIcon color="success" fontSize="small" />
            <Typography variant="subtitle2" color="success.main">
              Synonyms
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pl: 2 }}>
            {synonyms.map((synonym, index) => (
              <Chip
                key={index}
                label={synonym}
                size="small"
                color="success"
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Antonyms */}
      {antonyms?.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TrendingDownIcon color="error" fontSize="small" />
            <Typography variant="subtitle2" color="error.main">
              Antonyms
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pl: 2 }}>
            {antonyms.map((antonym, index) => (
              <Chip
                key={index}
                label={antonym}
                size="small"
                color="error"
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        </Box>
      )}
    </MinimalCard>
  );
};

const ExpandableSection = ({ title, icon: Icon, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        onClick={() => setExpanded(!expanded)}
        sx={{
          width: '100%',
          justifyContent: 'flex-start',
          textTransform: 'none',
          color: 'text.primary',
          mb: 1
        }}
        startIcon={Icon && <Icon />}
        endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        <Typography variant="subtitle1">{title}</Typography>
      </Button>
      <Collapse in={expanded}>
        <Box sx={{ pl: 2 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

const DetailedGrammarSection = ({ grammar }) => {
  if (!grammar) return null;

  const { verb } = grammar;
  if (!verb) return null;

  return (
    <ExpandableSection title="Grammar Details" icon={MenuBookIcon}>
      {/* Verb Properties */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="primary">Verb Properties</Typography>
        {verb.grammar_properties && (
          <Box sx={{ pl: 2 }}>
            {verb.grammar_properties.type && (
              <Typography variant="body2">
                Type: <Chip size="small" label={verb.grammar_properties.type} />
              </Typography>
            )}
            {verb.grammar_properties.auxiliary_verb && (
              <Typography variant="body2">
                Auxiliary: <Chip size="small" label={verb.grammar_properties.auxiliary_verb} />
              </Typography>
            )}
            {verb.grammar_properties.required_case && (
              <Typography variant="body2">
                Required Case: <Chip size="small" label={verb.grammar_properties.required_case} />
              </Typography>
            )}
            {verb.grammar_properties.separable_prefix && (
              <Typography variant="body2">
                Separable Prefix: <Chip size="small" label={verb.grammar_properties.separable_prefix} />
              </Typography>
            )}
            {verb.grammar_properties.common_prepositions?.length > 0 && (
              <Typography variant="body2">
                Common Prepositions: {' '}
                {verb.grammar_properties.common_prepositions.map((prep, idx) => (
                  <Chip key={idx} size="small" label={prep} sx={{ mr: 0.5 }} />
                ))}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {/* Conjugation */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="primary">Conjugation</Typography>
        <Box sx={{ pl: 2 }}>
          {verb.conjugation && Object.entries(verb.conjugation).map(([tense, form]) => (
            <Typography key={tense} variant="body2">
              {tense}: <strong>{form}</strong>
            </Typography>
          ))}
        </Box>
      </Box>

      {/* All Forms */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="primary">All Forms</Typography>
        <Box sx={{ pl: 2 }}>
          {verb.all_forms && Object.entries(verb.all_forms).map(([pronoun, form]) => (
            <Typography key={pronoun} variant="body2">
              {pronoun}: <strong>{form}</strong>
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Declension */}
      {verb.grammar_properties?.declension && (
        <Box>
          <Typography variant="subtitle2" color="primary">Declension</Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body2">
              Present Participle: <strong>{verb.grammar_properties.declension.present_participle}</strong>
            </Typography>
            <Typography variant="body2">
              Past Participle: <strong>{verb.grammar_properties.declension.past_participle}</strong>
            </Typography>
          </Box>
        </Box>
      )}
    </ExpandableSection>
  );
};

const ExamplesSection = ({ examples }) => {
  if (!examples) return null;

  return (
    <MinimalCard icon={FormatQuoteIcon} title="Examples">
      {/* Illustrative Examples */}
      {examples.illustrative?.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AutoStoriesIcon color="primary" fontSize="small" />
            <Typography variant="subtitle2" color="primary">
              Illustrative Examples
            </Typography>
          </Box>
          {examples.illustrative.map((example, index) => (
            <ExampleBox key={index} example={example} />
          ))}
        </Box>
      )}

      {/* Real World Examples */}
      {examples.real_world?.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <PublicIcon color="primary" fontSize="small" />
            <Typography variant="subtitle2" color="primary">
              Real World Examples
            </Typography>
          </Box>
          {examples.real_world.map((example, index) => (
            <ExampleBox key={index} example={example} />
          ))}
        </Box>
      )}
    </MinimalCard>
  );
};

const MeaningSection = ({ meaning, index }) => {
  if (!meaning) return null;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      {/* Main Meaning */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {index + 1}. {meaning.meaning}
        </Typography>
      </Box>

      {/* Level and Frequency */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {meaning.comprehension_level && (
          <Tooltip title="Comprehension Level">
            <Chip
              icon={<SchoolIcon />}
              label={meaning.comprehension_level}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Tooltip>
        )}
        {meaning.usage_frequency && (
          <Tooltip title="Usage Frequency">
            <Chip
              icon={<SpeedIcon />}
              label={meaning.usage_frequency}
              size="small"
              color="secondary"
              variant="outlined"
            />
          </Tooltip>
        )}
      </Box>

      {/* Translations */}
      {(meaning.translations?.en?.length > 0 || meaning.translations?.ru?.length > 0) && (
        <MinimalCard icon={TranslateIcon} title="Translations">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {meaning.translations.en?.map((translation, idx) => (
              <LanguageChipNew
                key={`en-${idx}`}
                language="en"
                translations={translation}
              />
            ))}
            {meaning.translations.ru?.map((translation, idx) => (
              <LanguageChipNew
                key={`ru-${idx}`}
                language="ru"
                translations={translation}
              />
            ))}
          </Box>
        </MinimalCard>
      )}

      {/* Memorization Hint */}
      {meaning.best_language_for_memorization && (
        <MemorizationHintSection 
          best_language_for_memorization={meaning.best_language_for_memorization}
        />
      )}

      {/* Examples */}
      {(meaning.examples?.illustrative?.length > 0 || meaning.examples?.real_world?.length > 0) && (
        <ExamplesSection examples={meaning.examples} />
      )}

      {/* Prepositions */}
      {meaning.prepositions?.length > 0 && (
        <PrepositionSection prepositions={meaning.prepositions} />
      )}

      {/* Semantic Network */}
      {(meaning.synonyms?.length > 0 || meaning.antonyms?.length > 0) && (
        <SemanticNetworkSection
          synonyms={meaning.synonyms}
          antonyms={meaning.antonyms}
        />
      )}

      {/* Idioms and Common Phrases */}
      {meaning.idioms_and_common_phrases?.length > 0 && (
        <IdiomsSection idioms={meaning.idioms_and_common_phrases} />
      )}
    </Paper>
  );
};

const WordResult = ({ result }) => {
  if (!result) return null;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography variant="h5">
          {result.word}
        </Typography>
        <Tooltip title="Part of Speech">
          <Chip
            label={result.part_of_speech}
            size="small"
            icon={<MenuBookIcon />}
            color="primary"
          />
        </Tooltip>
      </Box>

      <Box>
        {result.meanings?.map((meaning, index) => (
          <MeaningSection key={index} meaning={meaning} index={index} />
        ))}
      </Box>

      {result.grammar && (
        <DetailedGrammarSection grammar={result.grammar} />
      )}
    </Paper>
  );
};

export default WordResult;
