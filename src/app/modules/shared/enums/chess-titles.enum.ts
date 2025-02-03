export enum ChessTitle {
  NationalMaster = 'NationalMaster',
  WomanNationalMaster = 'WomanNationalMaster',
  CandidateMaster = 'CandidateMaster',
  WomanCandidateMaster = 'WomanCandidateMaster',
  FideMaster = 'FideMaster',
  WomanFideMaster = 'WomanFideMaster',
  InternationalMaster = 'InternationalMaster',
  WomanInternationalMaster = 'WomanInternationalMaster',
  GrandMaster = 'GrandMaster',
  WomanGrandMaster = 'WomanGrandMaster'
}

export const chessTitleToLabelMapping: Record<ChessTitle, string> = {
  [ChessTitle.NationalMaster]: 'NM',
  [ChessTitle.WomanNationalMaster]: 'WNM',
  [ChessTitle.CandidateMaster]: 'CM',
  [ChessTitle.WomanCandidateMaster]: 'WCM',
  [ChessTitle.FideMaster]: 'FM',
  [ChessTitle.WomanFideMaster]: 'WFM',
  [ChessTitle.InternationalMaster]: 'IM',
  [ChessTitle.WomanInternationalMaster]: 'WIM',
  [ChessTitle.GrandMaster]: 'GM',
  [ChessTitle.WomanGrandMaster]: 'WGM'
};
