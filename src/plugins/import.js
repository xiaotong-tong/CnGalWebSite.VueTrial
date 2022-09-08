import "../assets/common/css/init.css";
import "../assets/common/css/style.css";
import "../assets/common/css/common.css";

import iconButton from "../components/common/icon/iconButton.vue";
import icon from "../components/common/icon/icon.vue";
import button from "../components/common/button/button.vue";
import linkButton from "../components/common/button/linkButton.vue";
import tag from "../components/common/tag/tag.vue";
import card from "../components/common/card/card.vue";
import cardHeader from "../components/common/card/cardHeader.vue";
import noWrapGameList from "../components/common/gameCard/noWrapGameList.vue";
import newsCard from "../components/common/gameCard/newsCard.vue";
import homeGameCard from "../components/home/gameCard/gameCard.vue";
import normalGameCard from "../components/common/gameCard/normalGameCard.vue";
import commonDiscountGameCard from "../components/common/gameCard/discountGameCard.vue";
import refreshGameCardList from "../components/common/gameCard/refreshGameCardList.vue";
import evaluation from "../components/common/article/evaluation.vue";

import entriesGameCGsCardList from "../components/entries/gameCard/gameCGsCardList.vue";
import entriesGameCGsCard from "../components/entries/gameCard/gameCGsCard.vue";
import entriesGameCGPreview from "../components/entries/gameCard/gameCGPreview.vue";
import entriesGameRolesCardList from "../components/entries/gameCard/gameRolesCardList.vue";
import entriesGameRolesCard from "../components/entries/gameCard/gameRolesCard.vue";
import entriesGameRolesPreview from "../components/entries/gameCard/gameRolesPreview.vue";

import articlesGameEvaluationCardList from "../components/articles/gameCard/gameEvaluationCardList.vue";
import articlesGameEvaluationCard from "../components/articles/gameCard/gameEvaluationCard.vue";

import tooltip from "../components/common/tooltip/import";

const importPlugin = {
	install(app) {
		app.component("galButton", button);
		app.component("galIconButton", iconButton);
		app.component("galIcon", icon);
		app.component("galLinkButton", linkButton);
		app.component("galTag", tag);
		app.component("galCard", card);
		app.component("galCardHeader", cardHeader);
		app.component("galNoWrapGameList", noWrapGameList);
		app.component("galNewsCard", newsCard);
		app.component("galHomeGameCard", homeGameCard);
		app.component("galNormalGameCard", normalGameCard);
		app.component("galDiscountGameCard", commonDiscountGameCard);
		app.component("galRefreshGameCardList", refreshGameCardList);
		app.component("galEvaluation", evaluation);

		app.component("galEntriesGameCGsCardList", entriesGameCGsCardList);
		app.component("galEntriesGameCGsCard", entriesGameCGsCard);
		app.component("galEntriesGameCGPreview", entriesGameCGPreview);
		app.component("galEntriesGameRolesCardList", entriesGameRolesCardList);
		app.component("galEntriesGameRolesCard", entriesGameRolesCard);
		app.component("galEntriesGameRolesPreview", entriesGameRolesPreview);

		app.component(
			"galArticlesGameEvaluationCardList",
			articlesGameEvaluationCardList
		);
		app.component(
			"galArticlesGameEvaluationCard",
			articlesGameEvaluationCard
		);

		app.use(tooltip);
	}
};

export default importPlugin;
