import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Chip,
  Box,
  Tooltip,
  IconButton,
  Collapse
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

const MemorizationHintSection = ({ hint, reason, language }) => (
  <Box 
    sx={{ 
      backgroundColor: '#f0f4f8', 
      borderRadius: 2, 
      p: 2, 
      mb: 2, 
      display: 'flex', 
      alignItems: 'center',
      gap: 2
    }}
  >
    <LightbulbIcon color="primary" />
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        Best Language for Memorization: {language}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {reason}
      </Typography>
      {hint && (
        <Typography variant="body2" color="primary.main" sx={{ mt: 1, fontStyle: 'italic' }}>
          Memorization Hint: {hint}
        </Typography>
      )}
    </Box>
  </Box>
);

const SemanticNetworkSection = ({ synonyms, antonyms }) => (
  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
    {synonyms?.length > 0 && (
      <Box>
        <Tooltip title="Semantic Network: Synonyms">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CompareArrowsIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2">Synonyms:</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {synonyms.map((syn, idx) => (
                <Chip 
                  key={idx} 
                  label={syn} 
                  size="small" 
                  variant="outlined" 
                  color="primary"
                />
              ))}
            </Box>
          </Box>
        </Tooltip>
      </Box>
    )}
    {antonyms?.length > 0 && (
      <Box>
        <Tooltip title="Semantic Network: Antonyms">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CompareArrowsIcon fontSize="small" color="error" />
            <Typography variant="subtitle2">Antonyms:</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {antonyms.map((ant, idx) => (
                <Chip 
                  key={idx} 
                  label={ant} 
                  size="small" 
                  variant="outlined" 
                  color="error"
                />
              ))}
            </Box>
          </Box>
        </Tooltip>
      </Box>
    )}
  </Box>
);

const ExpandableSection = ({ title, children, icon: Icon }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 1, 
          cursor: 'pointer' 
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon color="primary" fontSize="small" />
          <Typography variant="subtitle1">{title}</Typography>
        </Box>
        <ExpandMoreIcon 
          sx={{ 
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', 
            transition: 'transform 0.3s' 
          }} 
        />
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

const DetailedGrammarSection = ({ grammar }) => {
  if (!grammar) return null;

  return (
    <Box>
      {grammar.verb && (
        <ExpandableSection title="Verb Grammar Details" icon={GrammarIcon}>
          <Box>
            <Typography variant="h6">Conjugation</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(grammar.verb.conjugation || {}).map(([form, value]) => (
                <Tooltip key={form} title={form}>
                  <Chip 
                    label={`${form}: ${value}`} 
                    size="small" 
                    variant="outlined" 
                  />
                </Tooltip>
              ))}
            </Box>

            {grammar.verb.grammar_properties && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Grammar Properties</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Tooltip title="Verb Type">
                    <Chip 
                      label={`Type: ${grammar.verb.grammar_properties.type}`}
                      size="small"
                      icon={<MenuBookIcon />}
                    />
                  </Tooltip>
                  <Tooltip title="Required Case">
                    <Chip 
                      label={`Case: ${grammar.verb.grammar_properties.required_case}`}
                      size="small"
                      icon={<GrammarIcon />}
                    />
                  </Tooltip>
                  <Tooltip title="Auxiliary Verb">
                    <Chip 
                      label={`Auxiliary: ${grammar.verb.grammar_properties.auxiliary_verb}`}
                      size="small"
                      icon={<LinkIcon />}
                    />
                  </Tooltip>
                </Box>
              </Box>
            )}
          </Box>
        </ExpandableSection>
      )}
    </Box>
  );
};

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
    <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
      {meaning.translations?.english?.length > 0 && (
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FlagComponent country="GB" />
          {meaning.translations.english.join('; ')}
        </Typography>
      )}
      {meaning.translations?.russian?.length > 0 && (
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FlagComponent country="RU" />
          {meaning.translations.russian.join('; ')}
        </Typography>
      )}
    </Box>

    {/* Memorization Hints */}
    {meaning.best_language_for_memorization && (
      <MemorizationHintSection 
        hint={meaning.best_language_for_memorization.hint}
        reason={meaning.best_language_for_memorization.reason}
        language={meaning.best_language_for_memorization.language}
      />
    )}

    {/* Semantic Network */}
    <SemanticNetworkSection 
      synonyms={meaning.synonyms} 
      antonyms={meaning.antonyms} 
    />

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

    {/* Rest of the existing sections remain the same */}
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

      <DetailedGrammarSection grammar={result.grammar} />
    </Paper>
  );
};

export default WordResult;
