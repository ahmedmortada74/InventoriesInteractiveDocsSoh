← Go back to 
[Inventories Module Documentation](/Inventories)


# Inventory_Reconcilement.aspx

## Overview

**File**: `\Inventories\Process\Inventory_Reconcilement.aspx`
**Purpose**: Inventory reconciliation and settlement system for stocktaking adjustments
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory administrators, stocktaking personnel, warehouse managers

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Store Selection (Required for Reconciliation)**
- **Store Dropdown**: Must select valid store for reconciliation
- **Error Prevention**: System validates store is selected before loading reconciliation data
- **Data Source**: Inventories_wharehouse_store table with store information
- **Default Behavior**: User must select store manually
- **Error Message**: Validation prevents reconciliation loading without store selection
- **Validation**: Only active stores are available

#### 2. **Committee Selection (Required for Reconciliation)**
- **Committee Dropdown**: Must select valid committee for reconciliation
- **Error Prevention**: System validates committee is selected before loading reconciliation data
- **Data Source**: Inventories_Random_Sampling_Committee_Header table with committee information
- **Default Behavior**: User must select committee manually
- **Error Message**: Validation prevents reconciliation loading without committee selection
- **Validation**: Only committees with status = 0 (pending) and having confirmed cards are available

#### 3. **Location Code Selection (Optional for Filtering)**
- **Location Code Dropdown**: Optional selection for location-based filtering
- **Error Prevention**: System allows filtering by location code if selected
- **Data Source**: Location codes based on selected store
- **Default Behavior**: User can select location code or leave empty for all locations
- **Error Message**: No validation required as this is optional
- **Validation**: Location codes are filtered based on selected store

### Common Error Scenarios and Prevention

#### **Store Selection Errors**
- **Error**: No store selected
- **Prevention**: Always select store before loading reconciliation data
- **Error**: Store has no reconciliation data
- **Prevention**: Verify store has inventory cards before selection

#### **Committee Selection Errors**
- **Error**: No committee selected
- **Prevention**: Always select committee before loading reconciliation data
- **Error**: Committee has no confirmed cards
- **Prevention**: Verify committee has confirmed inventory cards

#### **Reconciliation Management Errors**
- **Error**: Reconciliation confirmation fails
- **Prevention**: Ensure committee is selected before confirmation
- **Error**: Store opening fails
- **Prevention**: Ensure reconciliation is confirmed before opening store
- **Error**: Year-end closing fails
- **Prevention**: Ensure reconciliation is confirmed before year-end closing

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have reconciliation permissions** via employee group assignments
3. **Stores must be configured** in the system
4. **Committees must be active** and associated with stores
5. **Inventory cards must be confirmed** for committees

#### **Required System State**
- User authentication must be active
- Reconciliation permissions must be configured
- Store data must be current
- Committee data must be current
- Inventory cards must be confirmed

### Success Criteria

#### **For Store Selection**
- ✅ Store dropdown populated with active stores only
- ✅ Store validation ensures proper reconciliation loading
- ✅ Store selection enables committee filtering

#### **For Committee Selection**
- ✅ Committee dropdown populated with pending committees having confirmed cards
- ✅ Committee validation ensures proper reconciliation loading
- ✅ Committee selection enables reconciliation data display

#### **For Reconciliation Display**
- ✅ Reconciliation grid displays all items for selected committee
- ✅ Item details show complete reconciliation information
- ✅ Quantity calculations are accurate
- ✅ Price calculations are accurate

#### **For Reconciliation Management**
- ✅ Reconciliation confirmation confirms reconciliation properly
- ✅ Store opening opens store after reconciliation
- ✅ Year-end closing closes year-end properly
- ✅ Reconciliation status updates properly

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" ID="BootstrapFormLayout" Width="100%">
```

**Form Layout**: Bootstrap form layout with vertical structure for inventory reconciliation

### Store and Date Selection Section

```html
<!-- Store and Date Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_Store" AutoPostBack="true" DataSourceID="DataSource_Store" EnableMultiColumn="true" ValueField="id" DropDownRows="5" NullText="اختر المخزن" TextFormatString="{0} - {1} - {2}" CssClasses-Control="mb-2" OnSelectedIndexChanged="ComboBox_Store_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="id" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                    <dx:BootstrapListBoxField FieldName="english_name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="تاريخ بدء الجرد" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="textbox_startDate" Enabled="false" DisplayFormatString="D" CssClasses-Control="mb-2" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="تاريخ انتهاء الجرد" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="textBox_FinishDate" Enabled="false" DisplayFormatString="D" CssClasses-Control="mb-2" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Location and Committee Selection Section

```html
<!-- Location and Committee Selection -->
<dx:BootstrapLayoutItem Caption="الموقع" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_LocationCode" AutoPostBack="true" DropDownRows="5" NullText="اختر الموقع" CssClasses-Control="mb-2">
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="اللجنة" ColSpanMd="6">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="ComboBox_Comittee" AutoPostBack="true" ValueField="ID" NullText="اختر اللجنة" CssClasses-Control="mb-2" DataSourceID="DS_ComboBox_Comittee" OnSelectedIndexChanged="ComboBox_Comittee_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="ID" />
                    <dx:BootstrapListBoxField FieldName="Status" />
                    <dx:BootstrapListBoxField FieldName="Description" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Card and Reconcilement Number Section

```html
<!-- Card and Reconcilement Number -->
<dx:BootstrapLayoutItem Caption="رقم بطاقة الجرد" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="TextBox_Card_Num" Enabled="false" CssClasses-Control="mb-2" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="رقم مستند التسوية" ColSpanMd="3">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="TextBox_Reconcilement_Num" Enabled="false" CssClasses-Control="mb-2" />
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Reconciliation Items Grid Section

```html
<!-- Reconciliation Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <div class="d-flex border" style="border-color: gray;">
                <dx:BootstrapGridView runat="server" ID="GV_CardItems" Width="100%" KeyFieldName="Batch_No" AutoGenerateColumns="false" styles-cell-horizontalalign="Center" styles-cell-verticalalign="Middle" styles-header-verticalalign="Middle" styles-header-horizontalalign="Center" font-size="Small" EnableCallBacks="true" autopostback="true" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsText-EmptyDataRow="لاتوجد بيانات للعرض" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnCustomColumnDisplayText="GV_CardItems_CustomColumnDisplayText">
                    <SettingsDataSecurity AllowEdit="false" AllowDelete="false" AllowInsert="false" />
                    <Settings ShowFilterRow="true" ShowFooter="true" />
                    <Settings VerticalScrollableHeight="350" />
                    <SettingsPager PageSize="99999999">
                        <PageSizeItemSettings Visible="false" ShowAllItem="false" />
                    </SettingsPager>
                    <Columns>
                        <dx:BootstrapGridViewTextColumn FieldName="Header_ID" VisibleIndex="0" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewTextColumn FieldName="Body_ID" VisibleIndex="1" Visible="false"></dx:BootstrapGridViewTextColumn>
                        <dx:BootstrapGridViewBandColumn Caption="نتيجة الجرد" VisibleIndex="2" CssClasses-HeaderCell="text-center bg-info text-white">
                            <Columns>
                                <dx:BootstrapGridViewTextColumn VisibleIndex="0" Caption="#" UnboundType="String"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Item_Code" Caption="كود الصنف" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewBandColumn Caption="مسمي الصنف" VisibleIndex="3">
                                    <Columns>
                                        <dx:BootstrapGridViewTextColumn FieldName="Name_ar" Caption="المسمي العربي" VisibleIndex="3" CssClasses-HeaderCell="d-none"></dx:BootstrapGridViewTextColumn>
                                        <dx:BootstrapGridViewTextColumn FieldName="Name_en" Caption="المسمي الانجليزي" VisibleIndex="4" CssClasses-HeaderCell="d-none"></dx:BootstrapGridViewTextColumn>
                                    </Columns>
                                </dx:BootstrapGridViewBandColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Batch_No" Caption="الدفعة" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Confirm_Expiration_date" Caption="تاريخ الصلاحية بعد الجرد" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="UOM_Description" Caption="وحدة الجرد" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewBandColumn Caption="قبل الجرد" VisibleIndex="3">
                                    <Columns>
                                        <dx:BootstrapGridViewTextColumn FieldName="Item_Quantity" Caption="كمية"></dx:BootstrapGridViewTextColumn>
                                    </Columns>
                                </dx:BootstrapGridViewBandColumn>
                                <dx:BootstrapGridViewBandColumn Caption="زيادة" VisibleIndex="3">
                                    <Columns>
                                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Increase" Caption="كمية"></dx:BootstrapGridViewTextColumn>
                                    </Columns>
                                </dx:BootstrapGridViewBandColumn>
                                <dx:BootstrapGridViewBandColumn Caption="عجز" VisibleIndex="3">
                                    <Columns>
                                        <dx:BootstrapGridViewTextColumn FieldName="Quantity_Decrease" Caption="كمية"></dx:BootstrapGridViewTextColumn>
                                    </Columns>
                                </dx:BootstrapGridViewBandColumn>
                                <dx:BootstrapGridViewBandColumn Caption="بعد الجرد" VisibleIndex="3">
                                    <Columns>
                                        <dx:BootstrapGridViewTextColumn FieldName="Confirm_Item_Quantity" Caption="كمية"></dx:BootstrapGridViewTextColumn>
                                    </Columns>
                                </dx:BootstrapGridViewBandColumn>
                            </Columns>
                        </dx:BootstrapGridViewBandColumn>
                        <dx:BootstrapGridViewBandColumn Caption="التكلفة" VisibleIndex="3" CssClasses-HeaderCell="text-center bg-theme-2 text-white">
                            <Columns>
                                <dx:BootstrapGridViewTextColumn FieldName="Latest_Unit_price" Caption="تكلفة الوحدة" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Price_Increase" Caption="قيمة الزيادة" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Price_Decrease" Caption="قيمة العجز" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                                <dx:BootstrapGridViewTextColumn FieldName="Differences" Caption="الفروق" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                            </Columns>
                        </dx:BootstrapGridViewBandColumn>
                    </Columns>
                    <TotalSummary>
                        <dx:ASPxSummaryItem FieldName="Item_Quantity" SummaryType="Sum" DisplayFormat="{0}" />
                        <dx:ASPxSummaryItem FieldName="Quantity_Increase" SummaryType="Sum" DisplayFormat="{0}" />
                        <dx:ASPxSummaryItem FieldName="Quantity_Decrease" SummaryType="Sum" DisplayFormat="{0}" />
                        <dx:ASPxSummaryItem FieldName="Confirm_Item_Quantity" SummaryType="Sum" DisplayFormat="{0}" />
                        <dx:ASPxSummaryItem FieldName="Latest_Unit_price" SummaryType="Sum" DisplayFormat="{0}" />
                        <dx:ASPxSummaryItem FieldName="Price_Increase" SummaryType="Sum" DisplayFormat="{0}" />
                        <dx:ASPxSummaryItem FieldName="Price_Decrease" SummaryType="Sum" DisplayFormat="{0}" />
                        <dx:ASPxSummaryItem FieldName="Differences" SummaryType="Sum" DisplayFormat="{0}" />
                    </TotalSummary>
                </dx:BootstrapGridView>
            </div>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Confirm Button Section

```html
<!-- Confirm Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton runat="server" ID="Btn_Confirm" Text="إعتماد نتيجة الجرد" Enabled="true" OnClick="Btn_Confirm_Click" CssClasses-Control="mb-5">
                <SettingsBootstrap RenderOption="Success" />
                <CssClasses Icon="simple-icon-check" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Store Opening Popup Section

```html
<!-- Store Opening Popup -->
<dx:BootstrapPopupControl runat="server" PopupElementCssSelector="#default-popup-control-1" ClientInstanceName="popupControl_OpeningStore" Modal="true" ShowFooter="true" PopupHorizontalAlign="Center" PopupVerticalAlign="WindowCenter" Width="500px" CloseAction="CloseButton" ID="popupControl_OpeningStore">
    <HeaderTemplate>
        <h4 class="text-primary">
            <span class="fa fa-info-circle"></span>فتح المخزن
        </h4>
    </HeaderTemplate>
    <FooterTemplate>
        <dx:BootstrapButton runat="server" Text="نعم" AutoPostBack="false" UseSubmitBehavior="false" ID="Btn_OpenStore" OnClick="Btn_OpenStore_Click">
            <SettingsBootstrap RenderOption="Primary" />
        </dx:BootstrapButton>
        <dx:BootstrapButton runat="server" Text="لا" AutoPostBack="false" UseSubmitBehavior="false" ID="btn_closeStore" OnClick="btn_closeStore_Click">
            <SettingsBootstrap RenderOption="Dark" />
        </dx:BootstrapButton>
    </FooterTemplate>
    <ContentCollection>
        <dx:ContentControl>
            <p>هل تريد فتح المخزن بعد اعتماد النتيجة ؟</p>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

### Year-End Closing Popup Section

```html
<!-- Year-End Closing Popup -->
<dx:BootstrapPopupControl runat="server" PopupElementCssSelector="#default-popup-control-2" ClientInstanceName="popupControl_ClosedForEndYear" Modal="true" ShowFooter="true" PopupHorizontalAlign="Center" PopupVerticalAlign="WindowCenter" Width="500px" CloseAction="CloseButton" ID="popupControl_ClosedForEndYear">
    <HeaderTemplate>
        <h4 class="text-primary">
            <span class="fa fa-info-circle"></span>اقفال نهاية العام
        </h4>
    </HeaderTemplate>
    <FooterTemplate>
        <dx:BootstrapButton runat="server" Text="نعم" AutoPostBack="false" UseSubmitBehavior="false" ID="Btn_CloseForEndYear" OnClick="Btn_CloseForEndYear_Click">
            <SettingsBootstrap RenderOption="Primary" />
        </dx:BootstrapButton>
        <dx:BootstrapButton runat="server" Text="لا" AutoPostBack="false" UseSubmitBehavior="false" ID="btn_Cancel" OnClick="btn_Cancel_Click">
            <SettingsBootstrap RenderOption="Dark" />
        </dx:BootstrapButton>
    </FooterTemplate>
    <ContentCollection>
        <dx:ContentControl>
            <p>هل سيتم اقفال نهاية العام لهذا المخزن بهذا الجرد ؟</p>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Store Parameters**:
- `@Store_ID` - Store ID for filtering committees and reconciliation data

**Committee Parameters**:
- `@ID` - Committee ID for filtering reconciliation data

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Store Selection**: Loads committees based on selected store
3. **Committee Selection**: Loads reconciliation data based on selected committee
4. **Reconciliation Display**: Displays reconciliation items with details
5. **Reconciliation Confirmation**: Confirms reconciliation for processing
6. **Store Opening**: Opens store after reconciliation
7. **Year-End Closing**: Closes year-end for store

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads store information
3. Sets default reconciliation state
4. Initializes date displays

### ComboBox_Store_SelectedIndexChanged Method

```csharp
protected void ComboBox_Store_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads committees based on selected store

**Process**:
1. Validates store selection
2. Sets parameters for committee data source
3. Binds committee dropdown
4. Updates store information display

### ComboBox_Comittee_SelectedIndexChanged Method

```csharp
protected void ComboBox_Comittee_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads reconciliation data based on selected committee

**Process**:
1. Validates committee selection
2. Sets parameters for reconciliation data source
3. Binds reconciliation grid
4. Updates committee information display

### Btn_Confirm_Click Method

```csharp
protected void Btn_Confirm_Click(object sender, EventArgs e)
```

**Purpose**: Confirms reconciliation for processing

**Process**:
1. Validates committee selection
2. Confirms reconciliation
3. Updates reconciliation status
4. Shows store opening popup
5. Provides success feedback

### Btn_OpenStore_Click Method

```csharp
protected void Btn_OpenStore_Click(object sender, EventArgs e)
```

**Purpose**: Opens store after reconciliation

**Process**:
1. Validates reconciliation confirmation
2. Opens store
3. Updates store status
4. Provides success feedback

### Btn_CloseForEndYear_Click Method

```csharp
protected void Btn_CloseForEndYear_Click(object sender, EventArgs e)
```

**Purpose**: Closes year-end for store

**Process**:
1. Validates reconciliation confirmation
2. Closes year-end
3. Updates store status
4. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, english_name, active
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **Inventories_Random_Sampling_Committee_Header**
- **Purpose**: Committee header information
- **Key Fields**: ID, Description, Status, Store_ID, Deleted
- **Usage**: Provides committee list for filtering
- **Filtering**: Only committees with status = 0 and deleted = 0

#### **Inventories_Cards_Header**
- **Purpose**: Inventory card header information
- **Key Fields**: ID, Committee_ID, Status
- **Usage**: Tracks inventory cards for committees
- **Filtering**: Only cards with status = 1 (confirmed)

#### **Inventories_Cards_Body**
- **Purpose**: Inventory card body with item details
- **Key Fields**: ID, Header_ID, Item_Code, Name_ar, Name_en, Batch_No, Item_Quantity, Confirm_Item_Quantity, Expiration_date, Confirm_Expiration_date, Latest_Unit_price, UOM
- **Usage**: Tracks inventory items for cards
- **Filtering**: Only items associated with selected committee

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing reconciliation data

#### **Store Filtering**
```sql
SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store
```

**Filtering Logic**: Shows all stores for user
**Permission Logic**: All stores are available
**Validation**: Ensures store has reconciliation data

#### **Committee Filtering**
```sql
SELECT Committee_Header.ID, Committee_Header.Description, Committee_Header.Status 
FROM Inventories_Random_Sampling_Committee_Header Committee_Header 
INNER JOIN Inventories_Cards_Header Cards_Header ON Cards_Header.Committee_ID = Committee_Header.ID 
WHERE Committee_Header.Store_ID = @Store_ID AND Committee_Header.Status = 0 AND Committee_Header.Deleted = 0 AND Cards_Header.Status = 1
```

**Filtering Logic**: Shows only pending committees with confirmed cards
**Permission Logic**: Only committees with confirmed cards are available
**Validation**: Ensures committee has reconciliation data

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to store, location, and committee dropdowns

### Grid Selection Handling

```html
SettingsBehavior-AllowSelectSingleRowOnly="true"
SettingsBehavior-ProcessFocusedRowChangedOnServer="true"
SettingsBehavior-ProcessSelectionChangedOnServer="true"
```

**Grid Features**: Single row selection with server-side processing
**User Experience**: Provides responsive grid interaction
**Usage**: Applied to reconciliation items grid

### Popup Control Handling

```html
ClientInstanceName="popupControl_OpeningStore"
ClientInstanceName="popupControl_ClosedForEndYear"
```

**Popup Features**: Modal popups for confirmation dialogs
**User Experience**: Provides clear confirmation dialogs
**Usage**: Applied to store opening and year-end closing popups

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with vertical structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Store and Date Selection Section**
```html
<!-- Store and Date Selection -->
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="تاريخ بدء الجرد" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="تاريخ انتهاء الجرد" ColSpanMd="3">
```

#### **2. Location and Committee Selection Section**
```html
<!-- Location and Committee Selection -->
<dx:BootstrapLayoutItem Caption="الموقع" ColSpanMd="6">
<dx:BootstrapLayoutItem Caption="اللجنة" ColSpanMd="6">
```

#### **3. Card and Reconcilement Number Section**
```html
<!-- Card and Reconcilement Number -->
<dx:BootstrapLayoutItem Caption="رقم بطاقة الجرد" ColSpanMd="3">
<dx:BootstrapLayoutItem Caption="رقم مستند التسوية" ColSpanMd="3">
```

#### **4. Reconciliation Items Grid Section**
```html
<!-- Reconciliation Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **5. Confirm Button Section**
```html
<!-- Confirm Button -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **6. Store Opening Popup Section**
```html
<!-- Store Opening Popup -->
<dx:BootstrapPopupControl runat="server" PopupElementCssSelector="#default-popup-control-1">
```

#### **7. Year-End Closing Popup Section**
```html
<!-- Year-End Closing Popup -->
<dx:BootstrapPopupControl runat="server" PopupElementCssSelector="#default-popup-control-2">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Store Data Source
SqlDataSource DataSource_Store = new SqlDataSource();
DataSource_Store.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DataSource_Store.SelectCommand = "SELECT id, english_name, arabic_name FROM Inventories_wharehouse_store";

// Committee Data Source
SqlDataSource DS_ComboBox_Comittee = new SqlDataSource();
DS_ComboBox_Comittee.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
DS_ComboBox_Comittee.SelectCommand = "SELECT Committee_Header.ID, Committee_Header.Description, Committee_Header.Status FROM Inventories_Random_Sampling_Committee_Header Committee_Header INNER JOIN Inventories_Cards_Header Cards_Header ON Cards_Header.Committee_ID = Committee_Header.ID WHERE Committee_Header.Store_ID = @Store_ID AND Committee_Header.Status = 0 AND Committee_Header.Deleted = 0 AND Cards_Header.Status = 1";
```

## Business Logic and Validation

### Store Selection Validation

```csharp
protected void ComboBox_Store_SelectedIndexChanged(object sender, EventArgs e)
{
    if (ComboBox_Store.Value == "" || ComboBox_Store.Value == null)
    {
        // Clear committee dropdown
        ComboBox_Comittee.DataSource = null;
        ComboBox_Comittee.DataBind();
        return;
    }
    // ... additional validation
}
```

**Store Logic**: Validates store selection before loading committees
**Error Prevention**: Prevents committee loading without store selection

### Committee Selection Validation

```csharp
protected void ComboBox_Comittee_SelectedIndexChanged(object sender, EventArgs e)
{
    if (ComboBox_Comittee.Value == "" || ComboBox_Comittee.Value == null)
    {
        // Clear reconciliation grid
        GV_CardItems.DataSource = null;
        GV_CardItems.DataBind();
        return;
    }
    // ... additional validation
}
```

**Committee Logic**: Validates committee selection before loading reconciliation data
**Error Prevention**: Prevents reconciliation data loading without committee selection

### Reconciliation Confirmation Validation

```csharp
protected void Btn_Confirm_Click(object sender, EventArgs e)
{
    if (ComboBox_Comittee.Value == "" || ComboBox_Comittee.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار اللجنة');", true);
        return;
    }
    // ... additional validation
}
```

**Reconciliation Logic**: Validates committee selection before confirmation
**Error Prevention**: Prevents reconciliation confirmation without committee selection

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Store Selection Validation**: Must select store before loading committees
- **Committee Selection Validation**: Must select committee before loading reconciliation data
- **Reconciliation Confirmation Validation**: Must select committee before confirmation

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button state changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Store Validation**: Ensures store is active and available
- **Committee Validation**: Ensures committee is pending and has confirmed cards
- **Reconciliation Validation**: Ensures reconciliation data is available

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Store Access**: Ensures user has access to selected store
- **Reconciliation Access**: Ensures user can access and modify reconciliation records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Reconciliation Confirmation Success**: "تم اعتماد نتيجة الجرد" (Reconciliation confirmed successfully)
- **Store Opening Success**: "تم فتح المخزن" (Store opened successfully)
- **Year-End Closing Success**: "تم اقفال نهاية العام" (Year-end closed successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of reconciliation grid after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Reconciliation Management System**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Committee_Header` - Committee information
  - `Inventories_Cards_Header` - Inventory card headers
  - `Inventories_Cards_Body` - Inventory card items
  - `Inventories_UOM` - Unit of measure master data
- **Integration Details**:
  - Store selection controls committee filtering
  - Committee selection controls reconciliation data display
  - Reconciliation items displayed with complete details
- **Data Flow**:
  - Stores filtered for user access
  - Committees filtered by store
  - Reconciliation data filtered by committee

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all reconciliation operations
  - Store access controlled by user permissions

### Data Exchange

#### **Store and Committee Information**
- **Database Tables**:
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Random_Sampling_Committee_Header` - Committee information
- **Real-time Data**:
  - Store information for filtering
  - Committee information for reconciliation
  - Reconciliation quantities and prices
- **Data Relationships**:
  - Stores linked to committees via Store_ID
  - Committees linked to reconciliation via Committee_ID
  - Reconciliation items linked to committees via Committee_ID

#### **Reconciliation and Item Information**
- **Database Tables**:
  - `Inventories_Cards_Header` - Inventory card headers
  - `Inventories_Cards_Body` - Inventory card items
  - `Inventories_UOM` - Unit of measure master data
- **Real-time Data**:
  - Item details and descriptions
  - Reconciliation quantities and prices
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to reconciliation via Header_ID
  - Units linked to items via UOM field
  - Price calculations based on quantity and unit price

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار المخزن" Error**
- **Cause**: Store not selected before loading committees
- **Solution**: Always select store before loading committees
- **Prevention**: Store selection is required for all reconciliation operations

#### **"الرجاء اختيار اللجنة" Error**
- **Cause**: Committee not selected before loading reconciliation data
- **Solution**: Always select committee before loading reconciliation data
- **Prevention**: Committee selection is required for all reconciliation operations

#### **No Reconciliation Data Found**
- **Cause**: Committee has no confirmed cards
- **Solution**: Verify committee has confirmed inventory cards
- **Prevention**: Ensure committees have confirmed cards

#### **Reconciliation Confirmation Failed Error**
- **Cause**: Reconciliation cannot be confirmed
- **Solution**: Verify committee is selected before confirmation
- **Prevention**: Ensure proper selection before confirmation

#### **Store Opening Failed Error**
- **Cause**: Store cannot be opened
- **Solution**: Verify reconciliation is confirmed before opening store
- **Prevention**: Ensure proper confirmation before opening

#### **Year-End Closing Failed Error**
- **Cause**: Year-end cannot be closed
- **Solution**: Verify reconciliation is confirmed before year-end closing
- **Prevention**: Ensure proper confirmation before year-end closing

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Reconciliation Access**: Access to reconciliation operations
- **Store Access**: Access to stores with reconciliation data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Reconciliation Workflow**: Understanding of reconciliation process
- **Store Management**: Knowledge of store selection and filtering
- **Committee Management**: Knowledge of committee selection and reconciliation
- **Reconciliation Management**: Familiarity with reconciliation confirmation and store operations

## Usage Examples

### Basic Reconciliation Workflow

1. **Page Load**: Verify page loads with default data
2. **Store Selection**: Select store for reconciliation
3. **Committee Selection**: Select committee for reconciliation
4. **Reconciliation Review**: Review reconciliation items in grid
5. **Reconciliation Confirmation**: Confirm reconciliation for processing
6. **Store Opening**: Open store after reconciliation (optional)
7. **Year-End Closing**: Close year-end for store (optional)

### Reconciliation Management Workflow

1. **Store Selection**: Select store for reconciliation management
2. **Committee Review**: Review all committees for selected store
3. **Committee Selection**: Select committee for reconciliation
4. **Reconciliation Review**: Review reconciliation items with details
5. **Reconciliation Confirmation**: Confirm reconciliation for processing
6. **Store Management**: Manage store opening and year-end closing

### Multi-Committee Reconciliation Management

1. **Store Selection**: Select store for reconciliation
2. **Committee Review**: Review all committees for selected store
3. **Selective Reconciliation**: Reconcile specific committees as needed
4. **Reconciliation Comparison**: Compare reconciliation across committees
5. **Reconciliation Management**: Manage reconciliation as needed