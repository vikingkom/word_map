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

const SemanticNetworkSection = ({ synonyms, antonyms }) => {
  console.log('Semantic Network Data:', { synonyms, antonyms });

  if (!synonyms?.length && !antonyms?.length) {
    console.log('No synonyms or antonyms found');
    return null;
  }

  return (
    <Box>
      {/* Synonyms */}
      {synonyms?.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Synonyms
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {synonyms.map((syn, idx) => (
              <Tooltip key={idx} title={syn.usage_notes || ''}>
                <Chip
                  label={syn}
                  size="small"
                  variant="outlined"
                  color="success"
                />
              </Tooltip>
            ))}
          </Box>
        </Box>
      )}

      {/* Antonyms */}
      {antonyms?.length > 0 && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Antonyms
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {antonyms.map((ant, idx) => (
              <Tooltip key={idx} title={ant.usage_notes || ''}>
                <Chip
                  label={ant}
                  size="small"
                  variant="outlined"
                  color="error"
                />
              </Tooltip>
            ))}
          </Box>
        </Box>
      )}
    </Box>
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

  return (
    <Box>
      {/* Part of Speech */}
      {grammar.part_of_speech && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Part of Speech
          </Typography>
          <Typography>{grammar.part_of_speech}</Typography>
        </Box>
      )}

      {/* Gender */}
      {grammar.gender && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Gender
          </Typography>
          <Typography>{grammar.gender}</Typography>
        </Box>
      )}

      {/* Case Usage */}
      {grammar.case_usage && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Case Usage
          </Typography>
          <Typography>{grammar.case_usage}</Typography>
        </Box>
      )}

      {/* Conjugation */}
      {grammar.conjugation && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Conjugation
          </Typography>
          <Box sx={{ pl: 2 }}>
            {Object.entries(grammar.conjugation).map(([tense, forms]) => (
              <Box key={tense} sx={{ mb: 1 }}>
                <Typography variant="subtitle2">{tense}</Typography>
                <Box sx={{ pl: 2 }}>
                  {Object.entries(forms).map(([person, form]) => (
                    <Typography key={person} variant="body2">
                      {person}: {form}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Declension */}
      {grammar.declension && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Declension
          </Typography>
          <Box sx={{ pl: 2 }}>
            {Object.entries(grammar.declension).map(([number, cases]) => (
              <Box key={number} sx={{ mb: 1 }}>
                <Typography variant="subtitle2">{number}</Typography>
                <Box sx={{ pl: 2 }}>
                  {Object.entries(cases).map(([caseType, form]) => (
                    <Typography key={caseType} variant="body2">
                      {caseType}: {form}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Additional Notes */}
      {grammar.notes && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Additional Notes
          </Typography>
          <Typography variant="body2">{grammar.notes}</Typography>
        </Box>
      )}
    </Box>
  );
};

const MeaningSection = ({ meaning, index }) => {
  console.log('Meaning Data:', meaning);

  if (!meaning) return null;

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h6">
          {index + 1}. {meaning.meaning}
        </Typography>
        <Chip 
          icon={<SpeedIcon />} 
          label={meaning.usage_frequency} 
          size="small" 
          color="primary" 
          variant="outlined" 
        />
        <Chip 
          icon={<SchoolIcon />} 
          label={meaning.comprehension_level} 
          size="small" 
          color="secondary" 
          variant="outlined" 
        />
      </Box>

      {/* Translations Section */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          <TranslateIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Translations
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {meaning.translations?.en?.map((trans, idx) => (
            <LanguageChip key={idx} language="en" translations={trans} />
          ))}
          {meaning.translations?.ru?.map((trans, idx) => (
            <LanguageChip key={idx} language="ru" translations={trans} />
          ))}
        </Box>
      </Box>

      {/* Memorization Section */}
      {meaning.memorization_hint && (
        <MemorizationHintSection 
          hint={meaning.memorization_hint.hint}
          reason={meaning.memorization_hint.reason}
          language={meaning.memorization_hint.language}
        />
      )}

      {/* Examples Section */}
      {(meaning.examples?.illustrative?.length > 0 || meaning.examples?.real_world?.length > 0) && (
        <ExpandableSection title="Examples" icon={MenuBookIcon}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Illustrative Examples */}
            {meaning.examples?.illustrative?.length > 0 && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Illustrative Examples:
                </Typography>
                {meaning.examples.illustrative.map((ex, idx) => (
                  <ExampleBox 
                    key={idx} 
                    example={ex}
                  />
                ))}
              </Box>
            )}

            {/* Real-world Examples */}
            {meaning.examples?.real_world?.length > 0 && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Real-world Examples:
                </Typography>
                {meaning.examples.real_world.map((ex, idx) => (
                  <Box key={idx}>
                    <ExampleBox example={ex} />
                    <Typography variant="caption" color="text.secondary" sx={{ pl: 4 }}>
                      Source: {ex.source}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </ExpandableSection>
      )}

      {/* Prepositions Section */}
      {meaning.prepositions?.length > 0 && (
        <ExpandableSection title="Prepositions" icon={LinkIcon}>
          <PrepositionSection prepositions={meaning.prepositions} />
        </ExpandableSection>
      )}

      {/* Semantic Network Section */}
      {(meaning.semantic_network?.synonyms?.length > 0 || meaning.semantic_network?.antonyms?.length > 0) && (
        <ExpandableSection title="Semantic Network" icon={CompareArrowsIcon}>
          <SemanticNetworkSection 
            synonyms={meaning.semantic_network.synonyms}
            antonyms={meaning.semantic_network.antonyms}
          />
        </ExpandableSection>
      )}

      {/* Idioms Section */}
      {meaning.idioms_and_common_phrases?.length > 0 && (
        <ExpandableSection title="Idioms & Phrases" icon={FormatQuoteIcon}>
          <IdiomsSection idioms={meaning.idioms_and_common_phrases} />
        </ExpandableSection>
      )}

      {/* Grammar Section */}
      {meaning.grammar && (
        <ExpandableSection title="Grammar Details" icon={GradeIcon}>
          <DetailedGrammarSection grammar={meaning.grammar} />
        </ExpandableSection>
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
