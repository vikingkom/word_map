import React from 'react';
import {
  Paper,
  Typography,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Box
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GrammarIcon from '@mui/icons-material/Grade';
import SchoolIcon from '@mui/icons-material/School';
import SpeedIcon from '@mui/icons-material/Speed';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LinkIcon from '@mui/icons-material/Link';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import LanguageIcon from '@mui/icons-material/Language';
import FlagIcon from '@mui/icons-material/Flag';
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
  const getLanguageIcon = (lang) => {
    switch (lang.toLowerCase()) {
      case 'de':
        return <FlagComponent country="DE" />;
      case 'en':
        return <FlagComponent country="GB" />;
      case 'ru':
        return <FlagComponent country="RU" />;
      default:
        return <FlagIcon />;
    }
  };

  // Join multiple translations with a semicolon
  const text = Array.isArray(translations) ? translations.join('; ') : translations;

  return (
    <Chip
      avatar={
        <Box component="span" fontSize="medium" sx={{ pl: 1 }}>
          {getLanguageIcon(language)}
        </Box>
      }
      label={text}
      size="small"
      variant="outlined"
      sx={{ m: 0.5 }}
    />
  );
};

const ExampleBox = ({ example }) => (
  <Box sx={{ mb: 1, pl: 2 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* German example with bullet point */}
      <Typography component="div" sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <span style={{ marginRight: '8px' }}>•</span>
        <Box>
          <Typography>{example.de}</Typography>
          {/* Translations with smaller font and indentation */}
          <Box sx={{ pl: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <FlagComponent country="GB" size={16} />
              {example.en}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <FlagComponent country="RU" size={16} />
              {example.ru}
            </Typography>
          </Box>
        </Box>
      </Typography>
    </Box>
  </Box>
);

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

const PrepositionSection = ({ prepositions }) => (
  <MinimalCard icon={LinkIcon} title="Prepositions">
    <Box display="flex" flexWrap="wrap" gap={1}>
      {Object.entries(prepositions).map(([prep, examples]) => (
        <Box key={prep}>
          <Chip 
            label={prep} 
            size="small" 
            variant="outlined"
          />
          {examples.map((ex, idx) => (
            <ExampleBox key={idx} example={ex} />
          ))}
        </Box>
      ))}
    </Box>
  </MinimalCard>
);

const IdiomsSection = ({ idioms }) => (
  <MinimalCard icon={FormatQuoteIcon} title="Idioms & Phrases">
    <Box display="flex" flexWrap="wrap" gap={2}>
      {idioms.map((idiom, idx) => (
        <Tooltip key={idx} title={`${idiom.literal_translation} - ${idiom.meaning}`}>
          <Chip
            label={idiom.phrase}
            size="small"
            variant="outlined"
          />
        </Tooltip>
      ))}
    </Box>
  </MinimalCard>
);

const MeaningSection = ({ meaning, index }) => (
  <Box sx={{ 
    mb: 4, 
    pb: 3, 
    borderBottom: index > 0 ? '2px solid #e0e0e0' : 'none',
    '&:last-child': {
      borderBottom: 'none',
      mb: 0,
      pb: 0
    }
  }}>
    {/* Translations header */}
    <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {meaning.translations?.english?.length > 0 && (
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <FlagComponent country="GB" />
          {meaning.translations.english.join('; ')}
        </Typography>
      )}
      {meaning.translations?.russian?.length > 0 && (
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <FlagComponent country="RU" />
          {meaning.translations.russian.join('; ')}
        </Typography>
      )}
    </Box>

    {/* German meaning description */}
    <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
      {meaning.meaning}
    </Typography>

    {/* Usage stats */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <Tooltip title="Usage Frequency">
        <Chip
          icon={<SpeedIcon fontSize="small" />}
          label={meaning.usage_frequency}
          size="small"
          color={
            meaning.usage_frequency === 'high' ? 'success' :
            meaning.usage_frequency === 'medium' ? 'warning' : 
            'error'
          }
        />
      </Tooltip>
      <Tooltip title="Comprehension Level">
        <Chip
          icon={<SchoolIcon fontSize="small" />}
          label={meaning.comprehension_level}
          size="small"
          variant="outlined"
        />
      </Tooltip>
    </Box>

    {/* Synonyms and Antonyms section */}
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
      {meaning.synonyms?.length > 0 && (
        <Box>
          <Tooltip title="Synonyms">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CompareArrowsIcon fontSize="small" color="primary" />
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {meaning.synonyms.map((syn, idx) => (
                  <Chip key={idx} label={syn} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          </Tooltip>
        </Box>
      )}
      {meaning.antonyms?.length > 0 && (
        <Box>
          <Tooltip title="Antonyms">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CompareArrowsIcon fontSize="small" color="error" />
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {meaning.antonyms.map((ant, idx) => (
                  <Chip key={idx} label={ant} size="small" variant="outlined" color="error" />
                ))}
              </Box>
            </Box>
          </Tooltip>
        </Box>
      )}
    </Box>

    {/* Examples section */}
    {meaning.examples?.illustrative?.length > 0 && (
      <MinimalCard icon={MenuBookIcon} title="Examples">
        <Box>
          {meaning.examples.illustrative.map((ex, idx) => (
            <ExampleBox key={idx} example={ex} />
          ))}
          {meaning.examples.real_world?.map((ex, idx) => (
            <ExampleBox key={idx} example={ex} />
          ))}
        </Box>
      </MinimalCard>
    )}

    {meaning.prepositions && Object.keys(meaning.prepositions).length > 0 && (
      <PrepositionSection prepositions={meaning.prepositions} />
    )}

    {meaning.idioms_and_common_phrases?.length > 0 && (
      <IdiomsSection idioms={meaning.idioms_and_common_phrases} />
    )}
  </Box>
);

const GrammarSection = ({ grammar }) => {
  if (!grammar) return null;
  
  return (
    <MinimalCard icon={GrammarIcon} title="Grammar">
      {grammar.verb && (
        <Box mb={2}>
          <Tooltip title="Verb Forms">
            <Box display="flex" alignItems="center" gap={0.5}>
              <MenuBookIcon fontSize="small" color="primary" />
              <Typography variant="body2">{grammar.verb.infinitive}</Typography>
            </Box>
          </Tooltip>
          
          {grammar.verb.conjugation && (
            <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
              {Object.entries(grammar.verb.conjugation).map(([form, value]) => (
                <Tooltip key={form} title={form}>
                  <Chip
                    label={value}
                    size="small"
                    variant="outlined"
                  />
                </Tooltip>
              ))}
            </Box>
          )}

          {grammar.verb.grammar_properties && (
            <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
              <Tooltip title="Type">
                <Chip 
                  label={grammar.verb.grammar_properties.type}
                  size="small" 
                  icon={<MenuBookIcon />}
                />
              </Tooltip>
              <Tooltip title="Required Case">
                <Chip 
                  label={grammar.verb.grammar_properties.required_case}
                  size="small" 
                  icon={<GrammarIcon />}
                />
              </Tooltip>
              <Tooltip title="Auxiliary Verb">
                <Chip 
                  label={grammar.verb.grammar_properties.auxiliary_verb}
                  size="small" 
                  icon={<LinkIcon />}
                />
              </Tooltip>
            </Box>
          )}
        </Box>
      )}

      {grammar.noun && (
        <Box>
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            <Tooltip title="Gender">
              <Chip 
                label={grammar.noun.gender}
                size="small" 
                icon={<MenuBookIcon />}
              />
            </Tooltip>
            <Tooltip title="Plural">
              <Chip 
                label={grammar.noun.plural}
                size="small" 
                icon={<CompareArrowsIcon />}
              />
            </Tooltip>
          </Box>
          
          {grammar.noun.cases && (
            <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
              {Object.entries(grammar.noun.cases).map(([caseType, form]) => (
                <Tooltip key={caseType} title={caseType}>
                  <Chip
                    label={form}
                    size="small"
                    icon={<GrammarIcon />}
                    variant="outlined"
                  />
                </Tooltip>
              ))}
            </Box>
          )}
        </Box>
      )}
    </MinimalCard>
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

      <GrammarSection grammar={result.grammar} />
    </Paper>
  );
};

export default WordResult;
