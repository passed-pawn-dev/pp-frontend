export enum ChessTitle {
  FideCandidateMaster = 'FideCandidateMaster',
  WomanFideCandidateMaster = 'WomanFideCandidateMaster',
  FideMaster = 'FideMaster',
  WomanFideMaster = 'WomanFideMaster',
  InternationalMaster = 'InternationalMaster',
  WomanInternationalMaster = 'WomanInternationalMaster',
  Grandmaster = 'Grandmaster',
  WomanGranmaster = 'WomanGranmaster',
  NoTitle = 'NoTitle'
}

export const chessTitleToLabelMapping: Record<ChessTitle, string> = {
  [ChessTitle.FideCandidateMaster]: 'CM',
  [ChessTitle.WomanFideCandidateMaster]: 'WCM',
  [ChessTitle.FideMaster]: 'FM',
  [ChessTitle.WomanFideMaster]: 'WFM',
  [ChessTitle.InternationalMaster]: 'IM',
  [ChessTitle.WomanInternationalMaster]: 'WIM',
  [ChessTitle.Grandmaster]: 'GM',
  [ChessTitle.WomanGranmaster]: 'WGM',
  [ChessTitle.NoTitle]: 'No title'
};
