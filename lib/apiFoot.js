/**
 * FootSummary API Service - ScoreBat Video API v3
 * https://www.scorebat.com/video-api/v3/
 */

const API_BASE_URL = 'https://www.scorebat.com/video-api/v3/';

// Cache pour optimiser les requêtes
let cache = {
    matches: null,
    lastUpdated: null,
    CACHE_DURATION: 6 * 60 * 1000 // 6 minutes
};

/**
 * Récupère toutes les correspondances disponibles depuis l’API
 * @returns {Promise<Array>} Array of match objects
 */
export const getAllMatches = async () => {
    try {
        // Vérifier le cache d'abord
        if (cache.matches && Date.now() - cache.lastUpdated < cache.CACHE_DURATION) {
            return cache.matches;
        }

        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        
        // Mettre en cache les résultats
        cache.matches = data.response;
        cache.lastUpdated = Date.now();
        
        return data.response;
    } catch (error) {
        console.error('Error fetching matches:', error);
        throw error;
    }
};

/**
 * Récupère toutes les correspondances en Live disponibles depuis l’API
 * @returns {Promise<Array>} Array of match objects
 */
export const getAllMatchesLive = async () => {
    try {
        const matches = await getAllMatches();
        return matches.filter(match => 
           match.videos[0].title !== "live stream"
        );
    } catch (error) {
        console.error(`Error filtering by competition`, error);
        throw error;
    }
};





/**
 * Recherche des matchs par compétition/ligue
 * @param {string} competitionName 
 * @returns {Promise<Array>} Filtered array of matches
 */
export const getMatchesByCompetition = async (competitionName) => {
    try {
        const matches = await getAllMatches();
        return matches.filter(match => 
            match.competition.toLowerCase().includes(competitionName.toLowerCase())
        );
    } catch (error) {
        console.error(`Error filtering by competition ${competitionName}:`, error);
        throw error;
    }
};

/**
 * Recherche des matchs par équipe (recherche à la fois les équipes locales et extérieures)
 * @param {string} teamName 
 * @returns {Promise<Array>} Filtered array of matches
 */
export const getMatchesByTeam = async (teamName) => {
    try {
        const matches = await getAllMatches();
        return matches.filter(match => 
            match.title.toLowerCase().includes(teamName.toLowerCase()) ||
            match.side1.name.toLowerCase().includes(teamName.toLowerCase()) ||
            match.side2.name.toLowerCase().includes(teamName.toLowerCase())
        );
    } catch (error) {
        console.error(`Error filtering by team ${teamName}:`, error);
        throw error;
    }
};

/**
 * Récupère des matchs à partir d’une date spécifique
 * @param {Date} date 
 * @returns {Promise<Array>} Filtered array of matches
 */
export const getMatchesByDate = async (date) => {
    try {
        const matches = await getAllMatches();
        const targetDate = new Date(date).toDateString();
        
        return matches.filter(match => {
            const matchDate = new Date(match.date).toDateString();
            return matchDate === targetDate;
        });
    } catch (error) {
        console.error(`Error filtering by date ${date}:`, error);
        throw error;
    }
};

/**
 * Récupère les derniers matchs (les plus récents en premier)
 * @param {number} limit - Maximum number of matches to return
 * @returns {Promise<Array>} Sorted array of matches
 */
export const getLatestMatches = async (limit = 10) => {
    try {
        const matches = await getAllMatches();
        return matches
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    } catch (error) {
        console.error('Error getting latest matches:', error);
        throw error;
    }
};

/**
 * Récupère des matchs avec les points forts vidéo disponibles
 * @returns {Promise<Array>} Filtered array of matches with videos
 */
export const getMatchesWithVideos = async () => {
    try {
        const matches = await getAllMatches();
        return matches.filter(match => match.videos && match.videos.length > 0);
    } catch (error) {
        console.error('Error filtering matches with videos:', error);
        throw error;
    }
};

/**
 * Les recherches correspondent à plusieurs critères
 * @param {Object} criteria - { query: string, competition: string, team: string, date: Date }
 * @returns {Promise<Array>} Filtered array of matches
 */
export const searchMatches = async (criteria = {}) => {
    try {
        let matches = await getAllMatches();
        
        if (criteria.query) {
            const query = criteria.query.toLowerCase();
            matches = matches.filter(match => 
                match.title.toLowerCase().includes(query) ||
                match.competition.toLowerCase().includes(query) ||
                match.side1.name.toLowerCase().includes(query) ||
                match.side2.name.toLowerCase().includes(query)
            );
        }
        
        if (criteria.competition) {
            matches = matches.filter(match => 
                match.competition.toLowerCase().includes(criteria.competition.toLowerCase())
            );
        }
        
        if (criteria.team) {
            matches = matches.filter(match => 
                match.side1.name.toLowerCase().includes(criteria.team.toLowerCase()) ||
                match.side2.name.toLowerCase().includes(criteria.team.toLowerCase())
            );
        }
        
        if (criteria.date) {
            const targetDate = new Date(criteria.date).toDateString();
            matches = matches.filter(match => 
                new Date(match.date).toDateString() === targetDate
            );
        }
        
        return matches;
    } catch (error) {
        console.error('Error searching matches:', error);
        throw error;
    }
};


/**
 * Obtient une seule correspondance grâce à son identifiant unique
 * @param {string} matchId 
 * @returns {Promise<Object|null>} Match object or null if not found
 */
export const getMatchById = async (matchId) => {
    try {
        const matches = await getAllMatches();
        return matches.find(match => match.matchviewUrl.includes(matchId));
    } catch (error) {
        console.error(`Error finding match with ID ${matchId}:`, error);
        throw error;
    }
};

// Fonction utilitaire pour vider le cache (utile pour les tests)
export const clearCache = () => {
    cache.matches = null;
    cache.lastUpdated = null;
};

// export default {
//     getAllMatches,
//     getMatchesByCompetition: getMatchesByCompetition,
//     getMatchesByTeam,
//     getMatchesByDate,
//     getLatestMatches,
//     getMatchesWithVideos,
//     searchMatches,
//     getMatchById,
//     clearCache
// };